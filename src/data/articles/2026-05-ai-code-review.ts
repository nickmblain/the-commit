import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-05-ai-code-review',
    title: 'Using AI for Code Review Without Getting Burned',
    date: '2026-05-14',
    author: 'Nick Blain',
    excerpt:
        'AI is a capable first-pass reviewer, but it has consistent blind spots that will bite you if you are not watching for them. Here is how I use it without trusting it blindly.',
    tags: ['ai', 'dx', 'code-review'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "AI code review sounds better in demos than in practice. Not because it is useless — it is genuinely useful — but because its failure modes are subtle. It will confidently approve code that is technically correct but architecturally wrong for your project. If you are not watching for that, you will merge things you should not.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What AI Review Is Actually Good At',
        },
        {
            type: 'paragraph',
            content:
                "Style consistency, obvious logic errors, missing null checks, and naming problems are all things AI catches reliably. These are the mechanical concerns: the things a linter almost catches but does not, or the things that are technically valid but smell wrong to an experienced reader.",
        },
        {
            type: 'list',
            items: [
                "Functions that do two things when they should do one",
                "Prop names that do not match what the prop actually does",
                "Early returns that could flatten deeply nested conditionals",
                "Missing error handling in async functions",
                "Variable names that are technically correct but misleading",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'Where It Fails',
        },
        {
            type: 'paragraph',
            content:
                "AI has no context about your requirements. It reviews the code as written, not the code as intended. This means it will approve an implementation that is internally consistent but wrong for the problem you were actually trying to solve.",
        },
        {
            type: 'paragraph',
            content:
                "The subtler failure is architectural. AI will not tell you that a new component should not exist, that state should live somewhere else, or that this feature is adding the wrong kind of complexity. Those are judgment calls that require understanding the system, not just the diff.",
        },
        {
            type: 'paragraph',
            content:
                "Security is also a persistent gap. AI will not flag a missing URL validation pattern unless you have explicitly told it to look for one, which is exactly why those rules belong in a CLAUDE.md rather than in every prompt.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Pattern That Works',
        },
        {
            type: 'paragraph',
            content:
                "I use AI as a first-pass reviewer, not a final gate. Before I send a PR for human review, I run it through AI to surface the mechanical issues. That way, the human review conversation stays focused on architecture, product decisions, and context the AI cannot have.",
        },
        {
            type: 'code',
            language: 'typescript',
            content: `// The kind of thing AI catches well
function getUser(id) {                    // missing type annotation
  return users.find(u => u.id === id)     // returns undefined, not null
}

// The kind of thing AI misses
// This function is fine in isolation, but it should not exist:
// user data belongs in the auth composable, not fetched ad-hoc per component`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Trust the Output, Not the Confidence',
        },
        {
            type: 'paragraph',
            content:
                "AI review feedback sounds authoritative even when it is wrong. A model that says 'this looks good' with no caveats is not more reliable than one that hedges. The confidence of the output has no meaningful relationship to its accuracy. Read the feedback critically, not deferentially.",
        },
        {
            type: 'quote',
            content:
                "AI review is a tool for catching the obvious. It is not a substitute for understanding what you are shipping.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Dedicated AI Review Tools',
        },
        {
            type: 'paragraph',
            content:
                "If you want AI code review integrated directly into your pull request workflow rather than as a manual step, two tools are worth knowing about.",
        },
        {
            type: 'paragraph',
            content:
                "CodeRabbit is the best dedicated AI review tool I have used. It integrates with GitHub and GitLab, posts line-level comments on PRs automatically, and understands context across the diff rather than reviewing files in isolation. It catches real issues and the signal-to-noise ratio is high enough that I actually read its comments rather than dismissing them. It also learns from feedback over time and supports repo-level configuration to encode your conventions.",
        },
        {
            type: 'paragraph',
            content:
                "Qodo (which some of you will know from CMN) is another option in this space. It is integrated into the workflow and can surface issues during development before a PR is opened, which is a useful point in the process to catch things. The review quality is more variable than CodeRabbit, and it works better as a secondary check than a primary one. If you are already using it, running both is not a bad setup: Qodo catches things earlier, CodeRabbit catches things more reliably at the PR stage.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Rule',
        },
        {
            type: 'paragraph',
            content:
                "If AI review is the only review a piece of code gets, that code should not be in production. Use it to raise the quality of what goes to human review, not to replace human review. The combination is better than either alone.",
        },
    ],
}

export default article
