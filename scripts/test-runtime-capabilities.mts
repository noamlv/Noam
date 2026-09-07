import assert from "node:assert/strict";
import { evaluateRuntimeCapabilities } from "../lib/runtime-capabilities.ts";

assert.deepEqual(evaluateRuntimeCapabilities({ NODE_ENV: "production" }), {
  analytics: false,
  leadIntake: false,
  newsletter: false
});

assert.deepEqual(evaluateRuntimeCapabilities({ NODE_ENV: "production", DATABASE_URL: "postgres://db/noam" }), {
  analytics: true,
  leadIntake: true,
  newsletter: false
});

assert.deepEqual(evaluateRuntimeCapabilities({
  NODE_ENV: "production",
  DATABASE_URL: "postgres://db/noam",
  RESEND_API_KEY: "re_example",
  LEAD_NOTIFY_FROM: "NOAM <hola@noam.pe>"
}), {
  analytics: true,
  leadIntake: true,
  newsletter: true
});

assert.deepEqual(evaluateRuntimeCapabilities({ NODE_ENV: "development" }), {
  analytics: true,
  leadIntake: true,
  newsletter: true
});

console.log("Runtime capabilities OK");
