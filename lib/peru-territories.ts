export const peruTerritories = [
  { code: "01", name: "Amazonas" },
  { code: "02", name: "Áncash" },
  { code: "03", name: "Apurímac" },
  { code: "04", name: "Arequipa" },
  { code: "05", name: "Ayacucho" },
  { code: "06", name: "Cajamarca" },
  { code: "07", name: "Callao" },
  { code: "08", name: "Cusco" },
  { code: "09", name: "Huancavelica" },
  { code: "10", name: "Huánuco" },
  { code: "11", name: "Ica" },
  { code: "12", name: "Junín" },
  { code: "13", name: "La Libertad" },
  { code: "14", name: "Lambayeque" },
  { code: "15", name: "Lima" },
  { code: "16", name: "Loreto" },
  { code: "17", name: "Madre de Dios" },
  { code: "18", name: "Moquegua" },
  { code: "19", name: "Pasco" },
  { code: "20", name: "Piura" },
  { code: "21", name: "Puno" },
  { code: "22", name: "San Martín" },
  { code: "23", name: "Tacna" },
  { code: "24", name: "Tumbes" },
  { code: "25", name: "Ucayali" }
] as const;

export type PeruTerritoryCode = (typeof peruTerritories)[number]["code"];
