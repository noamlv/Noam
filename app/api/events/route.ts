import { NextResponse } from "next/server";
import { recordAnalyticsEvent } from "@/lib/analytics";
import { analyticsEventSchema } from "@/lib/analytics-validation";
import { allowRequest } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > 2_000) {
    return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
  }

  if (!allowRequest(request.headers, "analytics", 120, 60_000)) {
    return new NextResponse(null, { status: 429 });
  }

  const parsed = analyticsEventSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Evento inválido" }, { status: 400 });
  }

  try {
    await recordAnalyticsEvent(parsed.data);
  } catch {
    return new NextResponse(null, { status: 503 });
  }

  return new NextResponse(null, { status: 204 });
}
