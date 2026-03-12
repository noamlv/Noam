import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT_TYPES, type ContentFrontmatter, type ContentItem, type ContentType, type Topic } from "@/types/content";

const contentRoot = path.join(process.cwd(), "content");

async function readContentFile(type: ContentType, slug: string) {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);

  return {
    frontmatter: parsed.data as ContentFrontmatter,
    body: parsed.content
  };
}

async function readContentDir(type: ContentType) {
  const dir = path.join(contentRoot, type);
  const entries = await fs.readdir(dir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

function toItem(type: ContentType, slug: string, frontmatter: ContentFrontmatter): ContentItem {
  return {
    ...frontmatter,
    slug,
    type,
    url: `/${type}/${slug}`
  };
}

export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const slugs = await readContentDir(type);
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await readContentFile(type, slug);
      return toItem(type, slug, frontmatter);
    })
  );

  return items
    .filter((item) => !item.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getContentBySlug(type: ContentType, slug: string) {
  const { frontmatter, body } = await readContentFile(type, slug);

  if (frontmatter.draft) {
    return null;
  }

  return {
    item: toItem(type, slug, frontmatter),
    body
  };
}

export async function getFeaturedContent(type: ContentType, limit = 3) {
  const items = await getAllContent(type);
  return items.filter((item) => item.featured).slice(0, limit);
}

export async function getTopicBundle(topic: Topic) {
  const bundles = await Promise.all(
    CONTENT_TYPES.map(async (type) => {
      const items = await getAllContent(type);
      return items.filter((item) => item.topic === topic).slice(0, 4);
    })
  );

  return bundles.flat().sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getAllSlugs(type: ContentType) {
  return readContentDir(type);
}

export async function getRecentInsights(limit = 20) {
  const insights = await getAllContent("insights");
  return insights.slice(0, limit);
}
