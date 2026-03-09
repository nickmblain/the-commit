import type { Article } from '@/types/article'

const article: Article = {
  slug: '2025-03-the-first-commit',
  title: "The First Commit: Why I'm Writing Every Month",
  date: '2025-03-01',
  excerpt:
    'Starting a habit of monthly technical writing, and why documenting what you learn compounds faster than you expect.',
  tags: ['meta', 'vue', 'knowledge-sharing'],
  readingTimeMinutes: 4,
  body: [
    {
      type: 'paragraph',
      content:
        "Every codebase tells a story. Commits are the chapters, each one a decision, a fix, a small bet on what \"better\" looks like. This site is a commit. A deliberate record of what I'm learning, building, and thinking about month to month.",
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Goal',
    },
    {
      type: 'paragraph',
      content:
        "I set a goal for myself: contribute at least one written knowledge-sharing resource per month. README updates, technical docs, code comments, wiki articles: something that outlasts the context of a single sprint. The topics I'm most interested in right now are Vue.js patterns, AI-assisted development workflows, and the architecture of the systems I work on.",
    },
    {
      type: 'paragraph',
      content:
        'Writing monthly keeps the habit small enough to actually do. One piece. One topic. Shipped.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Why Vue?',
    },
    {
      type: 'paragraph',
      content:
        "Vue 3's Composition API is one of the most underrated improvements in frontend development in the last several years. The shift from options-based components to composables is more than a syntax preference: it changes how you think about reuse, testing, and co-location of logic.",
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// Before: logic scattered across options object
export default {
  data() { return { count: 0 } },
  computed: { doubled() { return this.count * 2 } },
  methods: { increment() { this.count++ } }
}

// After: logic co-located in a composable
export function useCounter() {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  const increment = () => count.value++
  return { count, doubled, increment }
}`,
    },
    {
      type: 'paragraph',
      content:
        "The composable is testable in isolation, portable across components, and readable without hunting through an options object. That's a meaningful quality-of-life improvement at scale.",
    },
    {
      type: 'heading',
      level: 2,
      content: "What's Coming",
    },
    {
      type: 'list',
      items: [
        "Deep dives on Vue 3 composable patterns I've found useful in production",
        'AI-assisted dev workflows: what actually saves time vs. what creates noise',
        'Architecture notes on building maintainable SPAs',
        'Reflections from quarterly self-assessments',
      ],
    },
    {
      type: 'paragraph',
      content:
        "Each article here is a commit: imperfect, intentional, and part of a longer diff. See you next month.",
    },
  ],
}

export default article
