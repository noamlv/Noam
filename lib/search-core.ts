export type SearchKind = "evidence" | "solution" | "product" | "sector";

export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SearchKind;
  label: string;
  topic?: "gobierno" | "inversion" | "ia";
  date?: string;
  featured?: boolean;
  keywords: string[];
};

export type SearchFilters = {
  query?: string;
  kind?: SearchKind | "all";
  topic?: SearchEntry["topic"] | "all";
  limit?: number;
};

const SEARCH_STOPWORDS = new Set([
  "con", "del", "desde", "el", "en", "la", "las", "los", "para", "por", "que", "sin", "una", "uno", "unos", "unas"
]);

export function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreEntry(entry: SearchEntry, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return entry.featured ? 2 : 1;

  const tokens = normalizedQuery
    .split(" ")
    .filter((token) => token.length >= 2 && !SEARCH_STOPWORDS.has(token));
  const title = normalizeSearchText(entry.title);
  const description = normalizeSearchText(entry.description);
  const keywords = normalizeSearchText(entry.keywords.join(" "));
  let score = 0;

  if (title === normalizedQuery) score += 50;
  else if (title.startsWith(normalizedQuery)) score += 32;
  else if (title.includes(normalizedQuery)) score += 24;
  if (keywords.includes(normalizedQuery)) score += 15;
  if (description.includes(normalizedQuery)) score += 8;

  for (const token of tokens) {
    if (title.includes(token)) score += 7;
    if (keywords.includes(token)) score += 4;
    if (description.includes(token)) score += 2;
  }

  return score > 0 && entry.featured ? score + 2 : score;
}

export function searchEntries(entries: SearchEntry[], filters: SearchFilters) {
  const query = filters.query?.trim() ?? "";
  const kind = filters.kind ?? "all";
  const topic = filters.topic ?? "all";
  const limit = Math.max(1, Math.min(filters.limit ?? 40, 100));

  return entries
    .filter((entry) => kind === "all" || entry.kind === kind)
    .filter((entry) => topic === "all" || entry.topic === topic)
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => !query || score > 0)
    .sort((a, b) => b.score - a.score || Number(Boolean(b.entry.featured)) - Number(Boolean(a.entry.featured)) || +(new Date(b.entry.date ?? 0)) - +(new Date(a.entry.date ?? 0)) || a.entry.title.localeCompare(b.entry.title, "es"))
    .slice(0, limit)
    .map(({ entry }) => entry);
}
