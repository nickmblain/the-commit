import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-03-ai-assistant-setup',
    title: 'One Repo, Every AI Assistant: How to Set Up Context That Works for the Whole Team',
    date: '2026-03-10',
    excerpt:
        'Your team uses Claude, Cursor, Copilot, and Windsurf. Each tool reads from a different file. Here is how to write your standards once and get coverage everywhere without maintaining four separate documents.',
    tags: ['ai', 'dx', 'knowledge-sharing'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "The CLAUDE.md file I wrote about earlier this month changed how I work. But when I brought the idea to my team, the first question was reasonable: not everyone uses Claude Code. Some use Cursor. Some use GitHub Copilot. Some use Windsurf. If the whole point is that the AI reads your standards before every session, a file only one tool reads is not a team solution.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Emerging Standard: AGENTS.md',
        },
        {
            type: 'paragraph',
            content:
                "There is an open format working its way toward becoming the universal answer: AGENTS.md. Stewarded by the Agentic AI Foundation under the Linux Foundation, it is a single file at the repo root that over 60,000 open-source projects already use. OpenAI Codex, Google Jules, Cursor, Windsurf, Aider, Devin, and others all read it. If your team can standardize on AGENTS.md as the canonical file, that is the cleanest long-term solution.",
        },
        {
            type: 'paragraph',
            content:
                "The catch is coverage gaps. GitHub Copilot still reads from .github/copilot-instructions.md. Claude Code reads CLAUDE.md. Until every tool converges on AGENTS.md (or until your team converges on one tool), you still need a strategy for the tools that do not support it yet.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Current Landscape',
        },
        {
            type: 'paragraph',
            content:
                "Each major AI coding assistant has its own convention for where it looks for repo-level instructions. They are all doing the same thing: reading a file at the start of a session to understand the project context. The names differ, but the purpose is identical.",
        },
        {
            type: 'list',
            items: [
                "AGENTS.md: open standard, supported by Codex, Jules, Cursor, Windsurf, Aider, and others",
                "Claude Code: CLAUDE.md at the repo root",
                "GitHub Copilot: .github/copilot-instructions.md",
                "Cursor and Windsurf: also read AGENTS.md in addition to their own files",
            ],
        },
        {
            type: 'paragraph',
            content:
                "The naive approach is to maintain separate files for each tool. That fails immediately: they drift apart, updates get missed, and the person who wrote the original content has to remember to update multiple places every time something changes.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Practical Strategy',
        },
        {
            type: 'paragraph',
            content:
                "Use AGENTS.md as your canonical file. It gets you coverage for most tools immediately. Then add thin tool-specific files for the gaps: a CLAUDE.md that imports or mirrors the content for Claude Code users, and a .github/copilot-instructions.md for Copilot. Keep those thin files in sync with a script rather than maintaining them by hand.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `# Sync AGENTS.md to tools that need their own file
# Add to package.json scripts or a pre-commit hook

cp AGENTS.md CLAUDE.md
cp AGENTS.md .github/copilot-instructions.md`,
        },
        {
            type: 'paragraph',
            content:
                "Cursor and Windsurf already read AGENTS.md natively, so they need no extra step. As more tools adopt the standard, the sync script gets shorter. Eventually it goes away.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What to Put in AGENTS.md',
        },
        {
            type: 'paragraph',
            content:
                "AGENTS.md is your canonical file. Everything you write in it applies to every tool that reads it, so write it once and write it well. The goal is to answer the questions every AI assistant gets wrong by default on your project.",
        },
        {
            type: 'list',
            items: [
                "Role and stack: what kind of project is this, what technologies are in use, what are the hard constraints",
                "Coding conventions: language, framework version, patterns you require (and patterns you forbid)",
                "Security rules: the specific things you need enforced, written as concrete rules not aspirations",
                "Architecture context: how the system is structured, where state lives, how components communicate",
                "Content and copy rules: tone, formatting preferences, anything the AI touches in user-facing text",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'Be Specific, Not Aspirational',
        },
        {
            type: 'paragraph',
            content:
                "'Write clean, maintainable code' is useless instruction. Every model already tries to do that and will tell you it did. What actually changes behavior are specific, concrete rules:",
        },
        {
            type: 'code',
            language: 'markdown',
            content: `# Bad: aspirational
- Write secure code
- Follow best practices
- Use modern patterns

# Good: specific
- TypeScript only. No JavaScript files.
- Use <script setup> and Composition API. No Options API.
- Never use v-html. If HTML rendering is required, sanitize with DOMPurify first.
- Validate all user-controlled URLs before using in href attributes.
- No em dashes in copy. Use a comma, colon, or rewrite the sentence.`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Keeping It in Sync',
        },
        {
            type: 'paragraph',
            content:
                "Run the sync script as part of your workflow, not as an afterthought. Adding it to a pre-commit hook means the tool-specific files are always up to date whenever the canonical file changes. The check-in of any one of those files becomes a record of when the standards changed.",
        },
        {
            type: 'paragraph',
            content:
                "If your team uses a monorepo, you can maintain a root-level canonical file and extend it per package. Each package gets its own tool-specific files that include the root standards plus any package-specific overrides.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Organizational Benefit',
        },
        {
            type: 'paragraph',
            content:
                "Getting the whole team onto the same AI context file has a side effect that is worth more than the tooling benefit: it forces a conversation about what your actual standards are. Not the standards everyone vaguely agrees on in principle, but the specific, written-down decisions that every developer and every AI assistant is expected to follow. That document belongs in the repo regardless of what tools your team uses.",
        },
        {
            type: 'quote',
            content:
                "The file is not just for the AI. It is a contract with your future teammates, written in a format that happens to be machine-readable.",
        },
        {
            type: 'paragraph',
            content:
                "AGENTS.md covers the baseline: who the AI is, what the project is, and what the rules are. But there is a layer on top of that worth building out: specialized agents scoped to specific jobs, invoked on demand. A test writer, a security reviewer, a doc generator. That is next month.",
        },
    ],
}

export default article
