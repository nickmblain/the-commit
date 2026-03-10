import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-04-custom-agents',
    title: 'Custom Agents and Slash Commands: Turning Repetitive Prompts Into Reusable Tools',
    date: '2026-04-08',
    excerpt:
        'Generic AI assistants do generic work. The upgrade is building specialized agents scoped to specific jobs: a test writer, a doc generator, a security reviewer. Here is how to build them and what makes them actually useful.',
    tags: ['ai', 'dx', 'knowledge-sharing'],
    readingTimeMinutes: 6,
    body: [
        {
            type: 'paragraph',
            content:
                "After setting up a context file for your repo, the next step in getting real value from AI tooling is specialization. A general-purpose assistant that knows your stack is useful. A purpose-built agent scoped to a single job — write tests for this component, document this API, review this diff for security issues — is consistently useful. The difference is specificity, and specificity requires building something intentional.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'How Each Tool Does It',
        },
        {
            type: 'paragraph',
            content:
                "Every major AI coding assistant has a mechanism for defining reusable, specialized agents. The concepts are the same: a named agent, a scoped prompt, and a way to invoke it. The implementation details differ.",
        },
        {
            type: 'heading',
            level: 3,
            content: 'Claude Code: .claude/commands/',
        },
        {
            type: 'paragraph',
            content:
                "Claude Code defines custom slash commands as markdown files under .claude/commands/. Each file is one command. The filename becomes the slash command name. Invoke with /write-tests, /review-security, etc. The agent inherits everything in your CLAUDE.md automatically.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `.claude/
  commands/
    write-tests.md
    review-security.md
    generate-docs.md
    fix-accessibility.md`,
        },
        {
            type: 'heading',
            level: 3,
            content: 'Cursor: Custom Modes',
        },
        {
            type: 'paragraph',
            content:
                "Cursor supports custom agent modes defined in .cursor/rules. Each rule file scopes behavior to a glob pattern or an explicit mode you activate from the UI. You can also define project-level instructions per file type, so your TypeScript files get different agent behavior than your test files.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `.cursor/
  rules/
    vue-components.mdc   # applies to src/components/**
    test-files.mdc       # applies to **/*.test.ts
    api-layer.mdc        # applies to src/api/**`,
        },
        {
            type: 'heading',
            level: 3,
            content: 'GitHub Copilot: Custom Instructions and Workspace Agents',
        },
        {
            type: 'paragraph',
            content:
                "Copilot reads from .github/copilot-instructions.md for baseline behavior. For specialized agents, Copilot supports coding agent tasks triggered from issues and pull requests, where you can define the scope and constraints in the issue body or via workspace configuration. Purpose-built Copilot Extensions can also scope an agent to a specific domain.",
        },
        {
            type: 'heading',
            level: 3,
            content: 'Windsurf: Cascade Flows',
        },
        {
            type: 'paragraph',
            content:
                "Windsurf's Cascade mode is inherently agent-oriented: it plans and executes multi-step tasks. You can define reusable flows as templates that scope Cascade's behavior to a specific job. Combined with .windsurfrules for baseline context, this gives you the same pattern as Claude Code slash commands but triggered from Windsurf's flow UI.",
        },
        {
            type: 'heading',
            level: 3,
            content: 'Aider: Custom Commands',
        },
        {
            type: 'paragraph',
            content:
                "Aider supports /commands defined in a local .aider.conf.yml or triggered via the CLI. You can script common tasks as shell aliases that invoke Aider with a specific message and file scope, which gets you agent-like behavior even without a formal command registry.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Makes a Good Agent Prompt',
        },
        {
            type: 'paragraph',
            content:
                "An analysis of over 2,500 repositories using agent configuration files found a clear pattern: specificity beats everything. Vague agents produce vague work. The agents that produce reliable output share three characteristics: a defined role with clear responsibilities, concrete examples of the output format, and explicit boundaries on what the agent should not do.",
        },
        {
            type: 'code',
            language: 'markdown',
            content: `# Bad: too vague to be reliable
You are a helpful assistant. Write tests for the current file.

# Good: role, output format, and constraints are all explicit
You are a test engineer for Vue 3 components using Vitest and Vue Test Utils.

For the current component:
1. Write unit tests covering all props, emits, and computed values
2. Write one integration test covering the primary user interaction
3. Use describe/it blocks with descriptive names
4. Never modify the source component file

Output tests in a file named [ComponentName].test.ts alongside the component.`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Six Agents Worth Building',
        },
        {
            type: 'paragraph',
            content:
                "Most development workflows have a short list of high-repetition tasks that AI handles well when given a clear scope. These are the ones that pay off fastest:",
        },
        {
            type: 'list',
            items: [
                "Test writer: given a component or function, write unit and integration tests. Specify the test framework, file naming, and whether to mock dependencies.",
                "Doc generator: given a composable or module, generate JSDoc comments and a usage example. Specify the output format and what level of detail to include.",
                "Security reviewer: scan the current diff or file for the vulnerability classes that matter to your stack. For Vue SPAs: v-html usage, unvalidated URLs, XSS vectors, localStorage misuse.",
                "Accessibility auditor: review a component for WCAG failures. Specify which criteria to check and what a passing result looks like.",
                "Code reviewer: given a diff, identify logic errors, naming problems, and anything that violates the project conventions in CLAUDE.md.",
                "Commit message writer: given staged changes, write a conventional commit message that explains the why, not just the what.",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'Concrete Examples Beat Descriptions',
        },
        {
            type: 'paragraph',
            content:
                "The most reliable way to get consistent output from an agent is to show it what good output looks like. One example in the prompt is worth more than three paragraphs describing the desired format. If your test agent keeps generating tests in the wrong structure, add a passing test to the prompt as a reference. The model will match it.",
        },
        {
            type: 'code',
            language: 'markdown',
            content: `# In your write-tests.md command

## Output format
Follow this structure exactly:

\`\`\`typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from './ComponentName.vue'

describe('ComponentName', () => {
  it('renders the title prop', () => {
    const wrapper = mount(ComponentName, { props: { title: 'Test' } })
    expect(wrapper.text()).toContain('Test')
  })
})
\`\`\``,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Start Small and Iterate',
        },
        {
            type: 'paragraph',
            content:
                "The first version of any agent prompt will have gaps. Run it against a few real files, see where it produces output you would not ship, and add constraints to close those gaps. An agent prompt is a living document: it improves as you use it and learn where it fails.",
        },
        {
            type: 'paragraph',
            content:
                "The test for a good agent is whether someone else on the team can run it and get the same quality output you would. If the results are person-dependent, the prompt is not specific enough yet.",
        },
        {
            type: 'quote',
            content:
                "A slash command is a decision you made once, preserved so you never have to make it again.",
        },
    ],
}

export default article
