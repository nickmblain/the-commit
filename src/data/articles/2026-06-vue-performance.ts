import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-06-vue-performance',
    title: 'Vue SPA Performance: The Practical Checklist',
    date: '2026-06-03',
    author: 'Nick Blain',
    excerpt:
        'Most Vue performance problems come from a short list of common mistakes. This is the checklist I work through when a SPA feels slow, and the order in which the fixes actually matter.',
    tags: ['vue', 'performance', 'patterns'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "Performance problems in Vue SPAs tend to cluster around the same few patterns: the initial bundle is too large, components re-render more than they should, large lists are unvirtualized, routes are not code-split. None of these are exotic, and most have direct fixes. The hard part is knowing which one to address first.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Start With the Bundle',
        },
        {
            type: 'paragraph',
            content:
                "Before optimizing anything, know what you are shipping. Vite's bundle analyzer gives you a visual breakdown of your production build. Run it before and after any optimization work. If you are not measuring, you are guessing.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `npx vite-bundle-visualizer`,
        },
        {
            type: 'paragraph',
            content:
                "What to look for: a single large chunk that loads everything upfront, duplicate dependencies bundled twice, and libraries that are much larger than you expected. A charting library you imported for one chart is a common culprit.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Lazy-Load Your Routes',
        },
        {
            type: 'paragraph',
            content:
                "Route-level code splitting is the highest-leverage change you can make to initial load time. It requires one line per route and Vite handles the chunk creation automatically.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// Before: everything loads upfront
import ArticleView from '@/views/ArticleView.vue'

// After: each route loads its own chunk on demand
const ArticleView = () => import('@/views/ArticleView.vue')`,
        },
        {
            type: 'paragraph',
            content:
                "The user only downloads the code for the route they are on. Subsequent routes preload in the background once the page is interactive.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Computed vs. Methods',
        },
        {
            type: 'paragraph',
            content:
                "This distinction matters more than it looks. Computed properties cache their result and only recompute when reactive dependencies change. Methods rerun on every render. For any derived value that filters, sorts, or transforms a list, the difference compounds at scale.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// Reruns on every render, even if articles has not changed
const filteredArticles = () => articles.value.filter(a => a.tags.includes(tag.value))

// Reruns only when articles or tag changes
const filteredArticles = computed(() => articles.value.filter(a => a.tags.includes(tag.value)))`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'KeepAlive for Expensive Routes',
        },
        {
            type: 'paragraph',
            content:
                "When a user navigates away from a route and back again, Vue destroys and recreates the component by default. For routes that are expensive to initialize, or where you want to preserve scroll position and form state, KeepAlive prevents that.",
        },
        {
            type: 'code',
            language: 'vue',
            content: `<RouterView v-slot="{ Component }">
  <KeepAlive :max="5">
    <component :is="Component" />
  </KeepAlive>
</RouterView>`,
        },
        {
            type: 'paragraph',
            content:
                "The max prop limits how many instances stay cached. Without it, every route you visit stays in memory. Five is a reasonable default for most apps.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Order of Operations',
        },
        {
            type: 'list',
            items: [
                "Measure first: bundle analyzer and browser DevTools Performance tab",
                "Lazy-load all routes",
                "Audit computed vs. method usage for expensive derivations",
                "Add KeepAlive for routes with expensive initialization",
                "Check list rendering for virtualization opportunities if lists exceed a few hundred items",
                "Measure again before declaring victory",
            ],
        },
        {
            type: 'quote',
            content:
                "Performance work without measurement is just moving code around and hoping.",
        },
    ],
}

export default article
