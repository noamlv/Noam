import fs from "node:fs/promises";
import path from "node:path";
import { getDb } from "@/lib/db";
import { notifyLeadCreated } from "@/lib/notifications";
import type { Lead } from "@/types/platform";
import type { LeadInput } from "@/lib/validation";

const localDataDir = path.join(process.cwd(), ".data");
const localLeadsPath = path.join(localDataDir, "leads.json");
const allowLocalFallback = process.env.NODE_ENV !== "production";

export class LeadStorageUnavailableError extends Error {
  constructor() {
    super("El almacenamiento de consultas no está disponible");
    this.name = "LeadStorageUnavailableError";
  }
}

async function notifyWithoutBlocking(lead: Lead) {
  try {
    await notifyLeadCreated(lead);
  } catch (error) {
    console.error("El lead fue guardado, pero la notificación no pudo enviarse.", error);
  }
}

async function readLocalLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(localLeadsPath, "utf8");
    return (JSON.parse(raw) as Lead[]).map((lead) => ({
      ...lead,
      organization: lead.organization ?? null,
      role: lead.role ?? null,
      organization_type: lead.organization_type ?? null,
      territory: lead.territory ?? null,
      timeline: lead.timeline ?? null,
      budget_range: lead.budget_range ?? null,
      origin_path: lead.origin_path ?? null,
      consent_at: lead.consent_at ?? null
    }));
  } catch {
    return [];
  }
}

async function writeLocalLeads(leads: Lead[]) {
  await fs.mkdir(localDataDir, { recursive: true });
  await fs.writeFile(localLeadsPath, JSON.stringify(leads, null, 2));
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const createdAt = new Date().toISOString();
  const lead: Lead = {
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    organization: input.organization || null,
    role: input.role || null,
    organization_type: input.organizationType || null,
    territory: input.territory || null,
    interest: input.interest,
    timeline: input.timeline || null,
    budget_range: input.budgetRange || null,
    message: input.message,
    source: input.source,
    origin_path: input.originPath || null,
    consent_at: input.consent ? createdAt : null,
    status: "new",
    created_at: createdAt
  };

  const db = getDb();

  if (db) {
    try {
      const savedLeads = (await db`
        insert into leads (
          id,
          name,
          email,
          organization,
          role,
          organization_type,
          territory,
          interest,
          timeline,
          budget_range,
          message,
          source,
          origin_path,
          consent_at,
          status,
          created_at
        )
        values (
          ${lead.id},
          ${lead.name},
          ${lead.email},
          ${lead.organization ?? null},
          ${lead.role ?? null},
          ${lead.organization_type ?? null},
          ${lead.territory ?? null},
          ${lead.interest},
          ${lead.timeline ?? null},
          ${lead.budget_range ?? null},
          ${lead.message},
          ${lead.source},
          ${lead.origin_path ?? null},
          ${lead.consent_at ?? null},
          ${lead.status},
          ${lead.created_at}
        )
        returning id, name, email, organization, role, organization_type, territory, interest, timeline, budget_range, message, source, origin_path, consent_at, status, created_at
      `) as unknown as Lead[];
      const [savedLead] = savedLeads;
      await notifyWithoutBlocking(savedLead);
      return savedLead;
    } catch (error) {
      if (!allowLocalFallback) {
        console.error("Postgres no pudo guardar una consulta.", error);
        throw new LeadStorageUnavailableError();
      }
      console.warn("Postgres no disponible; usando fallback local para leads.");
    }
  }

  if (!allowLocalFallback) {
    throw new LeadStorageUnavailableError();
  }

  const leads = await readLocalLeads();
  await writeLocalLeads([lead, ...leads]);
  await notifyWithoutBlocking(lead);
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const db = getDb();

  if (db) {
    try {
      return (await db`
        select id, name, email, organization, role, organization_type, territory, interest, timeline, budget_range, message, source, origin_path, consent_at, status, created_at
        from leads
        order by created_at desc
      `) as unknown as Lead[];
    } catch (error) {
      if (!allowLocalFallback) {
        console.error("Postgres no pudo leer las consultas.", error);
        throw new LeadStorageUnavailableError();
      }
      console.warn("Postgres no disponible; leyendo leads del fallback local.");
    }
  }

  if (!allowLocalFallback) {
    throw new LeadStorageUnavailableError();
  }

  return readLocalLeads();
}
