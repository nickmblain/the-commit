import { computed } from 'vue'
import { getSortedArticles } from '@/data/articles/index'

export function useArticles() {
  const articles = computed(() => getSortedArticles())
  return { articles }
}
