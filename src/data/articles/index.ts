import type { Article } from '@/types/article'
import article202503 from './2025-03-the-first-commit'

// Add new articles here — newest first by convention, sorted by date below
const articles: Article[] = [article202503]

export const getSortedArticles = (): Article[] =>
  [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug)
