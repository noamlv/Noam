import postgres from "postgres";
import { env } from "./env.ts";

let sqlClient: postgres.Sql | null = null;

export function hasDatabase() {
  return Boolean(env.databaseUrl);
}

export function getDb() {
  if (!env.databaseUrl) {
    return null;
  }

  if (!sqlClient) {
    sqlClient = postgres(env.databaseUrl, {
      max: 3,
      connect_timeout: 3,
      prepare: false,
      ssl: process.env.NOAM_DB_SSL === "false" ? false : "require"
    });
  }

  return sqlClient;
}
