import fs from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

async function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  try {
    const raw = await fs.readFile(envPath, "utf8");

    for (const line of raw.split("\n")) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
        continue;
      }

      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env.local is optional when DATABASE_URL is provided by the shell/host.
  }
}

await loadLocalEnv();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required to run migrations.");
  process.exit(1);
}

const migrationsDir = path.join(process.cwd(), "db", "migrations");
const sql = postgres(databaseUrl, {
  max: 1,
  prepare: false,
  ssl: process.env.NOAM_DB_SSL === "false" ? false : "require"
});

try {
  await sql`
    create table if not exists schema_migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    )
  `;

  const migrationFiles = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

  for (const filename of migrationFiles) {
    const [existing] = await sql`
      select filename
      from schema_migrations
      where filename = ${filename}
    `;

    if (existing) {
      console.log(`Skipping ${filename}`);
      continue;
    }

    const migrationSql = await fs.readFile(path.join(migrationsDir, filename), "utf8");

    await sql.begin(async (tx) => {
      await tx.unsafe(migrationSql);
      await tx`
        insert into schema_migrations (filename)
        values (${filename})
      `;
    });

    console.log(`Applied ${filename}`);
  }
} finally {
  await sql.end();
}
