import type { Article } from '@/types/article'
import article202503 from './2026-03-the-first-commit'
import article202603 from './2026-03-claude-md'
import article202603b from './2026-03-ai-assistant-setup'
import article202603c from './2026-03-slash-commands-qodo'
import article202604 from './2026-04-custom-agents'
import article202604b from './2026-04-composables-in-depth'
import article202605 from './2026-05-ai-code-review'
import article202606 from './2026-06-vue-performance'
import article202607 from './2026-07-accessible-components'
import article202608 from './2026-08-typescript-vue'
import article202609 from './2026-09-boring-architecture'
import article202610 from './2026-10-technical-writing'
import article202611 from './2026-11-vue-dotnet'
import article202612 from './2026-12-year-in-review'

// Add new articles here, newest first by convention, sorted by date below
const articles: Article[] = [
    article202503,
    article202603,
    article202603b,
    article202603c,
    article202604,
    article202604b,
    article202605,
    article202606,
    article202607,
    article202608,
    article202609,
    article202610,
    article202611,
    article202612,
]

const today = (): string => new Date().toISOString().split('T')[0]

export const getSortedArticles = (): Article[] =>
  [...articles]
    .filter((a) => import.meta.env.DEV || a.date <= today())
    .sort((a, b) => (a.date < b.date ? 1 : -1))

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug)

export const getNextArticle = (slug: string): Article | undefined => {
  const sorted = getSortedArticles() // newest first, date-filtered
  const index = sorted.findIndex((a) => a.slug === slug)
  if (index <= 0) return undefined
  return sorted[index - 1]
}
