import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-11-vue-router-patterns',
    title: 'Vue Router Patterns That Hold Up at Scale',
    date: '2026-11-01',
    author: 'Nick Blain',
    excerpt:
        'The basics of Vue Router are easy. The patterns that keep routing maintainable in a large SPA take more deliberate choices. Here are the ones that have made the biggest difference.',
    tags: ['vue', 'vue-router', 'patterns'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "Routing looks simple until you have fifty routes, three layers of navigation guards, route-level permissions, and a history of special cases accumulated over two years. The decisions you make early about how routes are named, how guards are composed, and where route state lives have a way of compounding. These are the patterns I wish I had applied from the start.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Named Routes Over Path Strings',
        },
        {
            type: 'paragraph',
            content:
                "Hardcoding path strings in router.push calls is a refactoring trap. When the path changes, every call site breaks silently at runtime. Named routes move the reference to a string you define once in the route config.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// Brittle: breaks silently when the path changes
router.push('/articles/2026-10-technical-writing')

// Resilient: the route config is the single source of truth
router.push({ name: 'article', params: { slug: article.slug } })`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Lazy-Load Every Route',
        },
        {
            type: 'paragraph',
            content:
                "Route-level code splitting is the default that should have been. Each route component becomes its own chunk, loaded only when the user navigates to it. The change is one line per route and the performance impact on initial load is significant.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `const routes = [
  {
    path: '/articles/:slug',
    name: 'article',
    component: () => import('@/views/ArticleView.vue'),
  },
]`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Navigation Guards as Composable Middleware',
        },
        {
            type: 'paragraph',
            content:
                "Global beforeEach guards grow messy when multiple concerns share them. A cleaner approach is to compose guards from small, single-purpose functions, each responsible for one check.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `const requireAuth = (to: RouteLocationNormalized) => {
  if (!isAuthenticated() && to.meta.requiresAuth) {
    return { name: 'login' }
  }
}

const trackPageView = (to: RouteLocationNormalized) => {
  analytics.track(to.fullPath)
}

router.beforeEach((to) => requireAuth(to))
router.afterEach((to) => trackPageView(to))`,
        },
        {
            type: 'paragraph',
            content:
                "Each guard is testable in isolation. Adding a new concern is a new function and a new registration, not a new conditional inside an existing guard.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Route Meta for Declarative Configuration',
        },
        {
            type: 'paragraph',
            content:
                "Route meta is the right place for configuration that belongs to the route but is not a parameter. Auth requirements, page titles, breadcrumb labels, and layout choices can all live in meta rather than inside components or guards.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `const routes = [
  {
    path: '/admin',
    component: () => import('@/views/AdminView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Admin',
      layout: 'admin',
    },
  },
]`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Route State in Composables',
        },
        {
            type: 'paragraph',
            content:
                "Reading route params and query strings directly in templates scatters routing concerns throughout the component tree. A composable that owns the route reading and exposes typed values keeps components clean and makes the routing logic testable.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `function useArticleRoute() {
  const route = useRoute()
  const slug = computed(() => route.params.slug as string)
  return { slug }
}`,
        },
        {
            type: 'quote',
            content:
                "The router is infrastructure. Components should consume route state, not depend on the router directly.",
        },
    ],
}

export default article
