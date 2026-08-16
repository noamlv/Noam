import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { createLead, getLeads, LeadStorageUnavailableError } from "@/lib/leads";
import { allowRequest } from "@/lib/rate-limit";
import { leadInputSchema } from "@/lib/validation";

export async function GET() {
  if (!(await isAdminAuthenticated(["owner", "editor"], true))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudieron cargar los leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
  }

  if (!allowRequest(request.headers, "lead-api", 6, 10 * 60_000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);

  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ accepted: true }, { status: 202 });
  }

  const parsed = leadInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const lead = await createLead(parsed.data);
    await recordAnalyticsEvent({ eventName: "lead_submit", path: parsed.data.originPath ?? "/api/leads", target: parsed.data.interest }).catch(() => false);
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof LeadStorageUnavailableError ? "Servicio temporalmente no disponible" : "No se pudo crear el lead" },
      { status: error instanceof LeadStorageUnavailableError ? 503 : 500 }
    );
  }
}
