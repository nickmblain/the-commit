import { computed } from 'vue'
import { getArticleBySlug } from '@/data/articles/index'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isValidSlug(slug: string): boolean {
  return typeof slug === 'string' && slug.length <= 100 && SLUG_PATTERN.test(slug)
}

export function useArticle(slug: string) {
  const article = computed(() => {
    if (!isValidSlug(slug)) return undefined
    return getArticleBySlug(slug)
  })
  return { article }
}
