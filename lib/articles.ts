import fs from "fs";
import path from "path";
import type { Article } from "./types";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8")) as Article)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Article;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getLatestArticles(limit = 6): Article[] {
  return getAllArticles().slice(0, limit);
}
