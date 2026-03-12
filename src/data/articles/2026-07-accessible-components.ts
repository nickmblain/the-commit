import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-07-accessible-components',
    title: 'Accessible Vue Components: The Patterns That Actually Matter',
    date: '2026-07-22',
    author: 'Nick Blain',
    excerpt:
        'Accessibility is not a post-launch audit item. It is a set of concrete patterns you apply while building. Here are the ones that make the biggest difference in Vue 3 components.',
    tags: ['vue', 'accessibility', 'patterns'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "Most accessibility problems in SPAs are not obscure edge cases. They are the same handful of issues showing up repeatedly: missing labels, broken keyboard navigation, focus that disappears after a route change, and interactive elements built from divs instead of buttons. None of these require deep WCAG expertise to fix. They require knowing the patterns.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Semantic HTML First',
        },
        {
            type: 'paragraph',
            content:
                "The highest-leverage accessibility decision you make in any component is which HTML element to use. A button element gives you keyboard activation, focus management, and role announcement for free. A div gives you none of that, and you spend the rest of the component's life patching those gaps manually.",
        },
        {
            type: 'code',
            language: 'vue',
            content: `<!-- Every additional attribute here compensates for the wrong element -->
<div
  role="button"
  tabindex="0"
  @click="toggle"
  @keydown.enter="toggle"
  @keydown.space.prevent="toggle"
>
  Toggle
</div>

<!-- This is what a button is for -->
<button @click="toggle">Toggle</button>`,
        },
        {
            type: 'paragraph',
            content:
                "Use button for actions, a for navigation, and the appropriate input types for form fields. The browser handles the behavior you would otherwise have to reimplement.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Labels Are Not Optional',
        },
        {
            type: 'paragraph',
            content:
                "Every interactive element needs an accessible name. For form inputs, that means an associated label element, not placeholder text. Placeholders disappear when the user types and are not reliably announced by screen readers.",
        },
        {
            type: 'code',
            language: 'vue',
            content: `<!-- Placeholder is not a label -->
<input type="email" placeholder="Email address" v-model="email" />

<!-- This is accessible -->
<label for="email">Email address</label>
<input id="email" type="email" v-model="email" />

<!-- Or with aria-label when a visible label is not practical -->
<input
  type="search"
  aria-label="Search articles"
  v-model="query"
/>`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Focus After Route Changes',
        },
        {
            type: 'paragraph',
            content:
                "Single-page apps do not navigate in the traditional sense. The page does not reload, the browser does not reset focus, and keyboard users are left wherever they were when they triggered the navigation. Managing focus on route change is a Vue Router responsibility you have to take on deliberately.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// In your router setup
router.afterEach(() => {
  nextTick(() => {
    const main = document.querySelector('main')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus()
    }
  })
})`,
        },
        {
            type: 'paragraph',
            content:
                "The tabindex='-1' makes the element programmatically focusable without adding it to the tab order. The focus call moves keyboard and screen reader users to the top of the new page content.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'ARIA: Use It Sparingly',
        },
        {
            type: 'paragraph',
            content:
                "ARIA attributes are a repair kit for when semantic HTML is not enough. They add meaning to elements that lack it. They do not override broken behavior, and overusing them creates more problems than it solves. The first rule of ARIA is: if you can use a native HTML element instead, do that.",
        },
        {
            type: 'list',
            items: [
                "aria-label: provides an accessible name when no visible label exists",
                "aria-describedby: links an element to additional descriptive text",
                "aria-live: announces dynamic content changes to screen readers",
                "aria-expanded: communicates open/closed state on toggles and dropdowns",
                "aria-hidden: removes decorative elements from the accessibility tree",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'Testing Without Specialist Tools',
        },
        {
            type: 'paragraph',
            content:
                "The fastest accessibility test you can run costs nothing: unplug your mouse and tab through the page. If you cannot reach every interactive element, or if you lose track of where focus is, you have found a real issue. The keyboard test catches more than most automated scanners.",
        },
        {
            type: 'quote',
            content:
                "Accessibility is not a feature you add at the end. It is the result of using the right elements from the start.",
        },
    ],
}

export default article
