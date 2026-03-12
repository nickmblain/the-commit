import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-03-slash-commands-qodo',
    title: 'Slash Commands That Fight Back: Automating the Qodo Review Loop',
    date: '2026-03-12',
    author: 'Nick Blain',
    excerpt:
        'Qodo posts AI review comments on every PR. Instead of manually triaging each one, we built a set of slash commands that do the triage for us, catch common issues before they get flagged, and keep the review cycle moving.',
    tags: ['ai', 'dx', 'code-review', 'claude-code'],
    readingTimeMinutes: 7,
    body: [
        {
            type: 'paragraph',
            content:
                "Qodo is an AI code reviewer that integrates directly into GitHub. Every time you open a pull request, it reads the diff, runs its analysis, and posts comments. Some are genuinely useful. Some are noise. All of them require a response, and on an active project with multiple PRs a week, that response loop adds up fast.",
        },
        {
            type: 'paragraph',
            content:
                "The naive solution is to just read through the comments and handle them one by one. That works, but it puts the review burden entirely on you. The better solution is to build tooling that meets Qodo halfway: slash commands that run before Qodo gets involved to eliminate the predictable comments, and commands that triage what Qodo finds so you can address the real issues instead of the noise.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Commands We Built',
        },
        {
            type: 'paragraph',
            content:
                "We added four slash commands to our Claude Code setup. Each one handles a specific part of the development workflow, and together they form a pipeline that dramatically reduces the number of Qodo comments that make it to code review.",
        },
        {
            type: 'list',
            items: [
                '/qa-audit: scans a Vue component for missing data-qa-id attributes before commit',
                '/commit: generates a conventional commit message from staged changes, focused on the why',
                '/pr: creates or updates the pull request with a task-linked title and a description built from the actual branch changes',
                '/pr-review: pulls the current PR, reads every Qodo comment, and walks through them with you',
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'Keeping data-qa-id Coverage Complete',
        },
        {
            type: 'paragraph',
            content:
                "Our project requires data-qa-id attributes on interactive elements so automated tests can reliably target them. It is easy to forget one when you are deep in a feature, and manually auditing a component is tedious work.",
        },
        {
            type: 'paragraph',
            content:
                "The /qa-audit command scans a Vue component and produces a list of every element that needs an attribute added. It understands which elements need them (buttons, inputs, links, modals, key containers) and which are just decorative layout that should be left alone. Running it before committing takes seconds and means you are not pushing a component with gaps in test coverage.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `# Run before committing a component
/qa-audit

# Example output:
# Missing data-qa-id on:
#   <button> at line 42 — suggest: "submit-payment-button"
#   <input>  at line 67 — suggest: "check-number-input"
#   No issues found in layout containers (correct)`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Opening a PR That Is Already Reviewed',
        },
        {
            type: 'paragraph',
            content:
                "A large share of Qodo comments are not about code quality at all. They are about missing context: a vague PR title, a description that just says 'fixes bug', no connection to the ticket the work came from. Qodo flags these because reviewers need them too. The /pr command removes this entire category.",
        },
        {
            type: 'paragraph',
            content:
                "When you run /pr, it does three things. First, it looks up the Asana task associated with the current branch and prepends the task ID to the PR title, so the connection between the ticket and the code is always explicit. Second, it reads the actual git log since the branch diverged from main and uses that to write the description, not a template, not a summary of what files changed, but a coherent explanation of what was built and why based on the real commit history. Third, it creates or updates the PR via the GitHub CLI.",
        },
        {
            type: 'code',
            language: 'markdown',
            content: `# PR title generated by /pr:
R20-947: Enhance payment method display and handling in CartOrderSummaryItem

## Summary
- Extracts PaymentMethodTypes as a shared constant to eliminate duplication
  across CartOrderSummaryItem and the payment processing pipeline
- Adds a pending indicator with a data-qa-id for test targeting
- Normalizes display logic so all payment method types render consistently

## Test plan
- [ ] Verify pending indicator appears for in-progress transactions
- [ ] Confirm PaymentMethodTypes constant resolves correctly in both call sites
- [ ] Check that existing payment method display is unchanged for completed orders`,
        },
        {
            type: 'paragraph',
            content:
                "The Asana task ID in the title means anyone looking at the PR immediately knows which ticket it belongs to, without digging through branch names or asking in Slack. The description built from the git log means reviewers arrive with context instead of having to read the diff cold. Both of these reduce the surface area for Qodo to flag issues that are really just missing information.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Triaging What Qodo Finds',
        },
        {
            type: 'paragraph',
            content:
                "Even with good pre-commit hygiene, Qodo will still find things. That is its job. The question is how quickly you can determine which comments need action and which are safe to dismiss.",
        },
        {
            type: 'paragraph',
            content:
                "The /pr-review command handles this. It fetches the current PR using the GitHub CLI, reads every open Qodo comment, and then works through them with you. For each comment it gives you an assessment: is this valid, is this a false positive, or is this a nitpick that does not affect correctness? For the valid ones, it offers to fix them directly.",
        },
        {
            type: 'code',
            language: 'markdown',
            content: `# What /pr-review does with each Qodo comment:

**Comment:** "This computed property recalculates on every render but its
dependencies never change after mount. Consider using a plain const."

Assessment: Valid. The prop is set once from a route param and never updated.
Action: Convert to plain const. Fix? [Y/n]

---

**Comment:** "Missing null check before accessing user.profile.avatar"

Assessment: False positive. This component only renders when user is
authenticated, guaranteed by the parent route guard.
Action: Safe to dismiss. Suggested reply drafted.`,
        },
        {
            type: 'paragraph',
            content:
                "This is where having a CLAUDE.md and AGENTS.md that describe your project conventions pays off. The /pr-review command knows your stack, your patterns, and your rules. When it says a Qodo comment is a false positive, it can explain why in terms of your actual codebase, not generic advice.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The End-to-End Workflow',
        },
        {
            type: 'paragraph',
            content:
                "In practice, the workflow looks like this: write the feature, run /qa-audit on any new components, use /commit to generate a clean commit message, and open the PR with /pr. When Qodo posts its comments, run /pr-review to triage them and handle the legitimate ones. What used to take the better part of an hour now takes ten minutes.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `# Feature complete, ready to ship

/qa-audit          # Check for missing data-qa-id attributes
/commit            # Generate a conventional commit message
/pr                # Open the PR: task-linked title, real description

# After Qodo runs:
/pr-review         # Triage every Qodo comment, fix the real ones`,
        },
        {
            type: 'heading',
            level: 2,
            content: 'Why This Works Better Than Reading Comments Manually',
        },
        {
            type: 'paragraph',
            content:
                "Manual review of AI comments has a hidden cost: context switching. You read a Qodo comment, you have to reconstruct why the code is the way it is, decide if the comment is valid, formulate a response or a fix, and then move on to the next one. Do that fifteen times per PR across multiple PRs per week and you have burned hours on overhead that does not ship features.",
        },
        {
            type: 'paragraph',
            content:
                "The slash command approach keeps the context alive. The model already knows the PR, the diff, the project conventions, and the review thread. You are making decisions, not reconstructing context for each comment. The difference is not small.",
        },
        {
            type: 'paragraph',
            content:
                "There is also a timing dimension. Running /qa-audit before you commit and catching a missing data-qa-id takes one second. Pushing with a gap, having a reviewer flag it, and pushing a fixup commit takes five minutes. Same for context: write a real PR description once with /pr, before Qodo and your reviewers ever see the branch, and that whole category of feedback disappears.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Building Your Own',
        },
        {
            type: 'paragraph',
            content:
                "If you are using Claude Code, slash commands live as markdown files in .claude/commands/. Each file is one command. The filename becomes the command name. They inherit all of your CLAUDE.md context automatically, which is what makes them project-aware rather than generic.",
        },
        {
            type: 'code',
            language: 'bash',
            content: `.claude/
  commands/
    qa-audit.md    # Audits Vue components for missing data-qa-id
    commit.md      # Generates conventional commit messages
    pr.md          # Creates or updates the PR with task-linked title and real description
    pr-review.md   # Triages Qodo comments on the current PR`,
        },
        {
            type: 'paragraph',
            content:
                "The most important thing to get right is specificity. A /pr command that says 'create a pull request' is barely better than running gh pr create yourself. A /pr command that says 'look up the Asana task for this branch, prepend its ID to the title, read the git log since main, write a description from the actual changes, then create or update the PR' does something repeatable that you would never bother doing by hand every time.",
        },
        {
            type: 'paragraph',
            content:
                "Match the commands to the friction you actually feel. If Qodo keeps flagging the same categories of issues in your codebase, those are the ones worth building pre-commit commands for. If context-free PRs are drawing comments, build the /pr command. If triage is the bottleneck, focus on /pr-review. The commands that earn their place are the ones built around real, recurring pain.",
        },
        {
            type: 'quote',
            content:
                "The best Qodo comment to respond to is the one that never gets posted because you caught it first.",
        },
    ],
}

export default article
