import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { getArticleBySlug, getNextArticle } from '@/data/articles/index'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isValidSlug(slug: string): boolean {
  return typeof slug === 'string' && slug.length <= 100 && SLUG_PATTERN.test(slug)
}

export function useArticle(slugSource: MaybeRefOrGetter<string>) {
  const article = computed(() => {
    const slug = toValue(slugSource)
    if (!isValidSlug(slug)) return undefined
    return getArticleBySlug(slug)
  })
  const nextArticle = computed(() => {
    const slug = toValue(slugSource)
    if (!isValidSlug(slug)) return undefined
    return getNextArticle(slug)
  })
  return { article, nextArticle }
}
