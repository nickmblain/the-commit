import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-04-composables-in-depth',
    title: 'Vue 3 Composables: The Reuse Pattern That Actually Works',
    date: '2026-04-22',
    author: 'Nick Blain',
    excerpt:
        'Composables are more than just functions with refs. Knowing how to compose them, handle async state cleanly, and clean up after themselves is what separates a solid composable from one that causes subtle bugs.',
    tags: ['vue', 'composables', 'patterns'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "I have written a lot of Vue 3 code at this point, and the composable is still the pattern I reach for most. Not because it is clever, but because it is the right level of abstraction for frontend logic. Testable, portable, and honest about what it depends on.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What a Composable Actually Is',
        },
        {
            type: 'paragraph',
            content:
                "A composable is a function that uses Vue's reactivity system. That is it. The name is a convention, not a framework concept. What makes them useful is not the pattern itself but what the pattern forces you to do: name the thing, isolate its dependencies, and return only what callers need.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Composables That Use Composables',
        },
        {
            type: 'paragraph',
            content:
                "The most underused feature of composables is composition. You can build a higher-level composable by calling lower-level ones inside it. This is where the pattern earns its name.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const value = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(value, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  return { value }
}

function useThemePreference() {
  const { value: theme } = useLocalStorage('theme', 'system')

  const isDark = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })

  return { theme, isDark }
}`,
        },
        {
            type: 'paragraph',
            content:
                "Each layer does one thing. The localStorage composable knows nothing about themes. The theme composable knows nothing about storage. Either can be tested in isolation, and the combination is more capable than either alone.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Async Composables',
        },
        {
            type: 'paragraph',
            content:
                "Async state is where composables most often get messy. The naive approach uses a ref for data and a separate boolean for loading state. That works until you need error handling, and then you end up with three loosely related refs that can fall out of sync. A better pattern models the state as a discriminated union:",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

function useAsync<T>(fn: () => Promise<T>) {
  const state = ref<AsyncState<T>>({ status: 'idle' })

  const execute = async () => {
    state.value = { status: 'loading' }
    try {
      const data = await fn()
      state.value = { status: 'success', data }
    } catch {
      state.value = { status: 'error', message: 'Something went wrong.' }
    }
  }

  return { state, execute }
}`,
        },
        {
            type: 'paragraph',
            content:
                "This eliminates the impossible states you get from loose boolean flags. The template either has data or it does not. There is no frame where loading is true and error is also set.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Cleanup Matters',
        },
        {
            type: 'paragraph',
            content:
                "Composables that set up event listeners, intervals, or subscriptions need to clean up when the component unmounts. Forgetting onUnmounted is one of the most common sources of memory leaks in Vue apps, and the bugs it causes are hard to reproduce because they only appear after navigation.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  window.addEventListener('resize', update)
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}`,
        },
        {
            type: 'paragraph',
            content:
                "If you find yourself writing the same addEventListener and removeEventListener pair in multiple components, that is a composable waiting to be extracted.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Test Is the Design',
        },
        {
            type: 'paragraph',
            content:
                "A composable that is hard to test has unclear responsibilities. If you cannot call it in a test without mocking half the world, the dependencies are not explicit enough. Writing composables that are easy to test and writing composables that are easy to reason about are the same discipline.",
        },
        {
            type: 'quote',
            content:
                "If you cannot describe what a composable does in one sentence without the word 'and', it is probably doing too much.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Worth the Investment',
        },
        {
            type: 'paragraph',
            content:
                "Composables do not automatically make code good. They provide a consistent, Vue-native pattern for isolating logic you would otherwise scatter across components. Done well, a composable is the kind of code you write once, test once, and use for years without thinking about it again.",
        },
    ],
}

export default article
