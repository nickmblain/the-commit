import type { Article } from '@/types/article'
import article202503 from './2026-03-the-first-commit'
import article202603 from './2026-03-claude-md'

// Add new articles here, newest first by convention, sorted by date below
const articles: Article[] = [article202503, article202603]

export const getSortedArticles = (): Article[] =>
  [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug)
