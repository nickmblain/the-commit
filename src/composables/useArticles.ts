import { ref, onMounted } from 'vue'
import type { Article } from '@/types/article'
import { fetchArticles } from '@/sanity/queries'

export function useArticles() {
  const articles = ref<Article[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      articles.value = await fetchArticles()
    } catch (e) {
      console.error('[useArticles]', e)
      error.value = 'Failed to load articles.'
    } finally {
      loading.value = false
    }
  })

  return { articles, loading, error }
}
