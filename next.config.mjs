const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'self' https://noamlv.github.io",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  ...(isProduction ? ["upgrade-insecure-requests"] : [])
].join("; ");

const securityHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" }
];

if (isProduction) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  ...(process.env.NOAM_STANDALONE === "true" ? { output: "standalone" } : {}),
  typescript: {
    ignoreBuildErrors: process.env.NOAM_SKIP_BUILD_TYPES === "true"
  },
  experimental: {
    cpus: 1
  },
  async redirects() {
    return [
      {
        source: "/insight/:slug",
        destination: "/insights/:slug",
        permanent: true
      },
      {
        source: "/verticals/electoral",
        destination: "/electoral",
        permanent: true
      },
      {
        source: "/demos/dataperu",
        destination: "/dataperu",
        permanent: true
      },
      {
        source: "/demos",
        destination: "/products",
        permanent: true
      },
      {
        source: "/demos/observatorio",
        destination: "/dataperu/municipios",
        permanent: true
      },
      {
        source: "/demos/planometro",
        destination: "/electoral/planometro-2026",
        permanent: true
      },
      {
        source: "/demos/barometro-electoral",
        destination: "/electoral/barometro-enero-2026",
        permanent: true
      },
      {
        source: "/products/planometro-electoral",
        destination: "/electoral/planometro-2026",
        permanent: true
      },
      {
        source: "/products/barometro-electoral-enero-2026",
        destination: "/electoral/barometro-enero-2026",
        permanent: true
      },
      {
        source: "/products/dataperu",
        destination: "/dataperu",
        permanent: true
      },
      {
        source: "/audiencias",
        destination: "/sectors",
        permanent: true
      },
      {
        source: "/audiencias/funcionarios",
        destination: "/sectors/public-sector",
        permanent: true
      },
      {
        source: "/audiencias/ciudadanos",
        destination: "/dataperu",
        permanent: true
      },
      {
        source: "/audiencias/datos",
        destination: "/evidence",
        permanent: true
      },
      {
        source: "/audiencias/chambas",
        destination: "/evidence",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }]
      },
      {
        source: "/portal/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }]
      },
      {
        source: "/api/leads",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }]
      },
      {
        source: "/api/events",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }]
      },
      {
        source: "/docs/noam-cv-public.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noarchive" }]
      },
      {
        source: "/docs/noam-cv.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }]
      }
    ];
  }
};

export default nextConfig;
