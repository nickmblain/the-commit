import { ref, onMounted } from 'vue'
import type { Article } from '@/types/article'
import { fetchArticleBySlug } from '@/sanity/queries'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function isValidSlug(slug: string): boolean {
  return typeof slug === 'string' && slug.length <= 100 && SLUG_PATTERN.test(slug)
}

export function useArticle(slug: string) {
  const article = ref<Article | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    if (!isValidSlug(slug)) {
      loading.value = false
      return
    }
    try {
      article.value = await fetchArticleBySlug(slug)
    } catch (e) {
      console.error('[useArticle]', e)
      error.value = 'Failed to load article.'
    } finally {
      loading.value = false
    }
  })

  return { article, loading, error }
}
