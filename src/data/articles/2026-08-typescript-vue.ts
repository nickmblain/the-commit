import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-08-typescript-vue',
    title: 'TypeScript Patterns That Make Vue 3 Better',
    date: '2026-08-11',
    excerpt:
        'TypeScript in Vue 3 is genuinely good, but there are specific patterns that unlock most of the value. Here are the ones worth learning.',
    tags: ['vue', 'typescript', 'patterns'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "TypeScript and Vue 3 are a good combination. The Composition API is designed in a way that makes types flow naturally, and script setup makes the annotation overhead minimal. But like most type systems, most of the value comes from a handful of patterns used well, not from adding types to everything uniformly.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Typed Props With defineProps',
        },
        {
            type: 'paragraph',
            content:
                "The generic form of defineProps gives you compile-time safety on component interfaces without a separate runtime validator. Required and optional props are expressed with standard TypeScript syntax.",
        },
        {
            type: 'code',
            language: 'vue',
            content: `<script setup lang="ts">
interface Props {
  title: string
  excerpt: string
  readingTimeMinutes: number
  tags?: string[]
}

const props = defineProps<Props>()

// Defaults for optional props
const { tags = [] } = withDefaults(defineProps<Props>(), {
  tags: () => [],
})
</script>`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Typed Emits',
        },
        {
            type: 'paragraph',
            content:
                "defineEmits with a type argument gives you a contract for every event your component can emit. The parent gets autocomplete and type checking. The component gets a compile error if it emits an event with the wrong payload.",
        },
        {
            type: 'code',
            language: 'vue',
            content: `<script setup lang="ts">
const emit = defineEmits<{
  select: [id: string]
  dismiss: []
}>()

// This works
emit('select', 'article-123')

// This is a compile error: wrong argument type
emit('select', 123)
</script>`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Generic Composables',
        },
        {
            type: 'paragraph',
            content:
                "Generics let you write composables that work across different data types without losing type information. The async state pattern from last month is a good example: the composable handles the mechanics, and the type parameter carries through to the template.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `function useAsync<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await fn()
    } catch {
      error.value = 'Something went wrong.'
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}

// T is inferred as Article[] from the return type of the function
const { data: articles, loading } = useAsync(() => fetchArticles())`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Discriminated Unions for Component State',
        },
        {
            type: 'paragraph',
            content:
                "When a component has meaningfully different states, a discriminated union makes those states explicit and prevents impossible combinations. Loading with data present is not a valid state. A union makes that unrepresentable.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `type ViewState =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'ready'; articles: Article[] }

const state = ref<ViewState>({ status: 'loading' })`,
        },
        {
            type: 'paragraph',
            content:
                "The template then narrows on status with v-if/v-else-if. Each branch only has access to the properties valid for that state. TypeScript enforces this at the template level when using Volar.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Rule of Thumb',
        },
        {
            type: 'quote',
            content:
                "Types are most useful at boundaries: component props, composable return values, and API responses. Inside a function, let inference do the work.",
        },
        {
            type: 'paragraph',
            content:
                "Annotating every intermediate variable is noise. Annotating the interfaces between pieces of your system is the investment that pays off when something changes three months from now.",
        },
    ],
}

export default article
