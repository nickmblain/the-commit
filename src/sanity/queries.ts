import { sanityClient } from './client'
import type { Article } from '@/types/article'

// GROQ: all published articles, sorted newest first
const ALL_ARTICLES_QUERY = `
  *[_type == "article" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    "date": publishedAt,
    excerpt,
    tags,
    readingTimeMinutes,
    body
  }
`

// GROQ: single article by slug
const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    "date": publishedAt,
    excerpt,
    tags,
    readingTimeMinutes,
    body
  }
`

export async function fetchArticles(): Promise<Article[]> {
  return sanityClient.fetch<Article[]>(ALL_ARTICLES_QUERY)
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  return sanityClient.fetch<Article | null>(ARTICLE_BY_SLUG_QUERY, { slug })
}
