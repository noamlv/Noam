import assert from "node:assert/strict";
import { siteConfig } from "../lib/site-config.ts";
import { buildWhatsAppUrl } from "../lib/whatsapp.ts";

const url = new URL(buildWhatsAppUrl("/services/estudios-diagnosticos-evaluacion", "una evaluación regional"));
assert.equal(url.origin + url.pathname, `https://wa.me/${siteConfig.whatsappNumber}`);

const message = url.searchParams.get("text");
assert.ok(message?.includes("https://noam.pe/services/estudios-diagnosticos-evaluacion"));
assert.ok(message?.includes("una evaluación regional"));
assert.ok(!message?.includes("undefined"));

const normalized = new URL(buildWhatsAppUrl("contact"));
assert.ok(normalized.searchParams.get("text")?.includes("https://noam.pe/contact"));

console.log(`WhatsApp OK: ${siteConfig.phone} y mensajes contextuales verificados`);
