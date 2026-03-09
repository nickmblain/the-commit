import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-03-claude-md',
    title: 'CLAUDE.md: The File That Made AI Actually Useful on My Projects',
    date: '2026-03-09',
    excerpt:
        'One markdown file at the root of your repo can be the difference between an AI assistant that helps and one that constantly needs correcting. Here is what changed when I started using it seriously.',
    tags: ['ai', 'vue', 'dx', 'knowledge-sharing'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "I used AI coding assistants for months before I understood why they kept frustrating me. The code they produced was technically fine, but it never quite fit. Wrong patterns, inconsistent style, security shortcuts I would never take. I spent more time correcting than I saved. Then I started using a CLAUDE.md file, and the experience flipped.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What CLAUDE.md Is',
        },
        {
            type: 'paragraph',
            content:
                "CLAUDE.md is a plain markdown file that lives at the root of your repository. Claude Code reads it automatically at the start of every session, before you type a single prompt. It is your standing instruction set: the rules, conventions, and context that apply to every piece of work in that codebase. You check it into git, so it travels with the repo.",
        },
        {
            type: 'paragraph',
            content:
                "Think of it like an onboarding document, except the person being onboarded never forgets it, never drifts from it, and applies it to every response without being asked.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Before',
        },
        {
            type: 'paragraph',
            content:
                "Before I had a CLAUDE.md, every session started from scratch. I would ask Claude to help with a Vue component, and it would produce something generic. Options API instead of Composition API. JavaScript instead of TypeScript. No input validation. v-html used carelessly. Sometimes it would add em dashes to copy, which I hate.",
        },
        {
            type: 'paragraph',
            content:
                "The corrections were small, but they added up. And they never stuck. Next session, same mistakes. I was re-teaching the model every time I opened a new chat, and the teaching evaporated when I closed it.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The After',
        },
        {
            type: 'paragraph',
            content:
                "With a CLAUDE.md in place, I stopped correcting the same things. The file tells Claude exactly what this project is: Vue 3 SPA, TypeScript only, Composition API with script setup, no SSR, no v-html, no em dashes in copy. It specifies security rules I care about, like validating all URLs before putting them in an href, and it explains the site's purpose so generated content fits the tone.",
        },
        {
            type: 'paragraph',
            content:
                "The first session after I wrote it seriously, Claude produced a component I could drop in with almost no changes. That had not happened before.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Goes In It',
        },
        {
            type: 'paragraph',
            content:
                "The structure is up to you, but the most useful CLAUDE.md files cover four areas.",
        },
        {
            type: 'list',
            items: [
                "Role and stack: What kind of developer should Claude act as? What technologies are in play? What are the hard constraints? For this site, that means Vue 3, client-only SPA, TypeScript, no external runtimes.",
                "Coding rules: The specific patterns you want enforced. Not just 'write good code' but actual decisions: use script setup, prefer computed properties over watchers, do not use v-html without DOMPurify, validate all external URLs.",
                "Security principles: Worth being explicit about. Generic AI output tends to skip input validation, ignore URL sanitization, and treat security as optional. Writing it down as a hard rule changes the output.",
                "Content and copy rules: If the AI ever touches user-facing text, tell it your voice. My file says no em dashes, full stop. That single rule has saved me more editing time than almost anything else.",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'A Real Example',
        },
        {
            type: 'paragraph',
            content:
                "Here is the URL validation pattern my CLAUDE.md requires whenever user-controlled links are rendered. Without the file, Claude would often skip this entirely. With it, the pattern shows up correctly, every time:",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `const validateAndSanitizeUrl = (url: string): string => {
  if (typeof url !== 'string') return '#'

  try {
    const u = new URL(url, window.location.origin)
    const allowedProtocols = ['https:', 'mailto:', 'tel:']
    return allowedProtocols.includes(u.protocol) ? u.href : '#'
  } catch {
    return '#'
  }
}`,
        },
        {
            type: 'paragraph',
            content:
                "That is not a pattern you want to explain in every prompt. You write it once in CLAUDE.md, and it becomes part of the baseline.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Hidden Benefit: It Forces You to Articulate Your Standards',
        },
        {
            type: 'paragraph',
            content:
                "Writing a CLAUDE.md is harder than it sounds, and that difficulty is the point. You have to actually decide what your conventions are. Not 'we try to write clean code' but the specific, concrete decisions you have made and why. That process surfaces disagreements on teams, clarifies vague instincts, and produces something you can point to.",
        },
        {
            type: 'paragraph',
            content:
                "I have a security section in my file that I wrote by thinking through every XSS vector relevant to a Vue 3 SPA. Going through that exercise was useful independent of the AI tooling. The document itself became a reference: the kind of thing that belongs in a team wiki or an ADR, not just an AI config file.",
        },
        {
            type: 'quote',
            content:
                "The value of CLAUDE.md is not just what it tells the AI. It is what it forces you to figure out about your own project.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Keeping It Honest',
        },
        {
            type: 'paragraph',
            content:
                "A CLAUDE.md can go stale. If your stack changes, if you adopt a new pattern, if a security rule turns out to be wrong: update the file. Treat it like a living document, not a one-time setup. I check mine into git alongside the rest of the codebase, which means changes are tracked, reviewable, and part of the project's history.",
        },
        {
            type: 'paragraph',
            content:
                "It also helps to be specific rather than aspirational. 'Write secure code' is useless instruction. 'Do not use v-html. If HTML rendering cannot be avoided, sanitize with DOMPurify before assigning to reactive state' is something the model can actually follow.",
        },
        {
            type: 'heading',
            level: 2,
            content: "It's Not Just Claude",
        },
        {
            type: 'paragraph',
            content:
                "This idea is not unique to Claude Code. Cursor has .cursorrules. GitHub Copilot reads from .github/copilot-instructions.md. Windsurf has .windsurfrules. The names differ, the mechanism is the same: a file the tool reads before every session that shapes how it behaves in your repo. More on standardizing across tools is coming, but the core principle holds regardless of which assistant you use. Write down your rules. Put the file in the repo. Stop explaining yourself from scratch every session.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Worth Doing',
        },
        {
            type: 'paragraph',
            content:
                "If you use Claude Code regularly on a project and you do not have a CLAUDE.md, you are leaving most of the value on the table. The model is capable of following your conventions. It just needs them written down somewhere permanent.",
        },
        {
            type: 'paragraph',
            content:
                "Spend an hour on it. Write down your stack, your hard rules, and at least one thing that always annoys you when AI output gets it wrong. Then pay attention to the first session where you do not have to correct it.",
        },
        {
            type: 'paragraph',
            content:
                "If you want a starting point, here is the Vue 3 security-focused CLAUDE.md I use on this project.",
        },
        {
            type: 'details',
            summary: 'My Vue 3 security CLAUDE.md (click to expand)',
            content: `# Role

Act as an expert, idiomatic Vue 3 (latest stable) developer focused on security, maintainability, and accessibility for client-side rendered SPA apps (no SSR/Node). Generate secure-by-default Vue JavaScript code that prevents XSS and related client risks without relying on server controls, using Composition API, \`<script setup>\`, and Vue's automatic escaping.

# Security Principles

- Vue 3 SPA, client-only: No SSR, no server runtimes, no Node code. Everything runs in the browser.
- TypeScript only unless the user explicitly asks for JavaScript.
- Assume all data is hostile: Inputs, props, query params, localStorage, and all API responses.
- Security is mandatory, not optional or "nice to have".

# Coding Rules

## Output & Template Safety

- Use normal Vue templating for untrusted values: {{ value }}, :title="value", :aria-label="value"
  Vue escapes automatically.

- Avoid v-html. If HTML rendering cannot be avoided:
  - Sanitize with DOMPurify at a current stable version.
  - Sanitize at the boundary, before assigning to reactive state.
  - Treat sanitized HTML as a special type; do not mix it with raw strings.

- Do not use innerHTML, outerHTML, insertAdjacentHTML, or document.write.

- For dynamic inline styles:
  - Never accept arbitrary CSS from users.
  - Use CSS.escape() for dynamic selectors from untrusted data.
  - Constrain style bindings to specific, validated formats.

## URL & Navigation Safety

- Validate all user-controlled URLs before use in <a>, <RouterLink>, iframes, or navigation:

  const validateAndSanitizeUrl = (url: string): string => {
    if (typeof url !== 'string') return '#'
    try {
      const u = new URL(url, window.location.origin)
      const allowedProtocols = ['https:', 'mailto:', 'tel:']
      return allowedProtocols.includes(u.protocol) ? u.href : '#'
    } catch {
      return '#'
    }
  }

- Vue Router: never pass free-form user strings into to or router.push() for external navigation.
- Prevent open redirects: only allow URLs from a strict allowlist of trusted destinations.

## Inputs, Data, and Validation

- Validate all user input: type, length, and format before use.
- Use appropriate HTML attributes: type, min, max, pattern, maxLength.
- Apply schema validation (Zod or similar) to API responses before updating reactive state.
- Secure file inputs: restrict with accept, check size and MIME type before processing.
- postMessage: verify event.origin against an allowlist; schema-validate event.data.

## Component & Prop Hygiene

- Keep templates declarative. Do not build templates from raw strings.
- Do not dynamically choose component or tag names from untrusted data.
- Do not pass untrusted values into event handlers as executable code.
- Avoid <button v-bind="userProps" /> with unvalidated objects.

# Security Design Rules

- Never store secrets, tokens, or sensitive PII in localStorage, sessionStorage, URLs, or global state.
- Only store benign UI preferences in localStorage in minimal structured formats.
- Load external scripts only from trusted hosts, preferably via bundling.
- No eval, no new Function, no setTimeout/setInterval with string arguments.
- Avoid contenteditable unless absolutely necessary; sanitize any extracted HTML.

# Code Quality & Architecture

- Prefer Composition API and <script setup> for all new components.
- Keep components small and focused; use computed properties for derived state.
- Follow WCAG: semantic HTML, logical focus order, proper ARIA labels.
- Show safe, generic error messages. Never expose stack traces or tokens in the UI.

# Content & Copy Rules

- Never use em dashes. Use a comma, a colon, a period, or rewrite the sentence.`,
        },
    ],
}

export default article
