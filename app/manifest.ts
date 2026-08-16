import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NOAM · Inteligencia pública y territorial",
    short_name: "NOAM",
    description: "Estudios, sistemas de decisión e inteligencia artificial para gobiernos, empresas y organizaciones.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f1e8",
    theme_color: "#f4f1e8",
    lang: "es-PE",
    categories: ["business", "productivity", "education"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
