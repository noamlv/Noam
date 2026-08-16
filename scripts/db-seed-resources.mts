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

const { seedPlatformResources } = await import("../lib/platform-resources.ts");
const { getDb } = await import("../lib/db.ts");
const result = await seedPlatformResources();
console.log(`Recursos sincronizados: ${result.inserted} nuevos de ${result.total}.`);
await getDb()?.end();
