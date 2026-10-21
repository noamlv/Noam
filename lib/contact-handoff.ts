export function buildDirectEmailBody({ topic, territory, context }: { topic?: string; territory?: string; context?: string }) {
  const territoryLine = territory?.trim() ? `Territorio: ${territory.trim()}\n` : "";

  if (context?.trim()) return `${context.trimEnd()}\n\n${territoryLine}`;

  return `Hola, quisiera conversar sobre ${topic || "un posible encargo"}.\n\n${territoryLine}Organización:\nDecisión o problema:\nPlazo aproximado:\n`;
}
