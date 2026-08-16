import { randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

try {
  const raw = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...parts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = parts.join("=").trim().replace(/^['"]|['"]$/g, "");
  }
} catch {}

const valueFor = (name: string) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
};

const email = valueFor("--email");
const displayName = valueFor("--name") ?? "Administrador NOAM";
const role = valueFor("--role") ?? "owner";
if (!email || !email.includes("@") || !["owner", "editor", "analyst"].includes(role)) {
  console.error("Uso: npm run admin:create -- --email tu@email.com --name \"Tu nombre\" --role owner");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL es obligatorio. En local, ejecuta primero npm run db:local y npm run db:migrate.");
  process.exit(1);
}

const password = `${randomBytes(18).toString("base64url")}aA1!`;
const { createAdminUser } = await import("../lib/admin-identity.ts");
const { getDb } = await import("../lib/db.ts");

try {
  const user = await createAdminUser({ email, displayName, role: role as "owner" | "editor" | "analyst", password });
  console.log(`Identidad creada: ${user.displayName} <${user.email}> · ${user.role}`);
  console.log(`Contraseña inicial (se muestra una sola vez): ${password}`);
  console.log("Ingresa al panel y reemplázala antes de operar información real.");
} catch (error) {
  console.error(error instanceof Error ? error.message : "No se pudo crear la identidad.");
  process.exitCode = 1;
} finally {
  await getDb()?.end();
}
