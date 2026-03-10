import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-09-boring-architecture',
    title: 'Boring Architecture Is Good Architecture',
    date: '2026-09-17',
    excerpt:
        'The best frontend architecture decisions I have made were the ones that prioritized longevity over novelty. Here is what boring actually means, and why it is the right default.',
    tags: ['architecture', 'dx', 'knowledge-sharing'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "There is a version of frontend development that treats every new tool as a potential upgrade and every architectural decision as provisional. I have worked in that mode, and the cost is real: dependencies that outlive their maintenance window, migration work that never quite finishes, and a codebase that reads like a timeline of whatever was popular when each feature was built.",
        },
        {
            type: 'heading',
            level: 2,
            content: "What Boring Actually Means",
        },
        {
            type: 'paragraph',
            content:
                "Boring architecture is not outdated architecture. It is architecture built on tools and patterns that are proven, well-understood, and unlikely to require significant rework in the next two years. The goal is not to avoid change, it is to change deliberately and for reasons that hold up under scrutiny.",
        },
        {
            type: 'paragraph',
            content:
                "Vue 3, TypeScript, Vite, and Vue Router are boring in this sense. They are stable, actively maintained, and widely understood. The team's knowledge compounds on a stable foundation. Swapping any of them has a measurable cost that needs to outweigh the benefit.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Cost of Novelty',
        },
        {
            type: 'list',
            items: [
                "New tools have thin documentation, sparse Stack Overflow coverage, and rough edges that only appear in production",
                "Every dependency you add is a future migration, a security surface, and a maintenance responsibility",
                "Team members who were not involved in the adoption decision have to learn the tool from scratch",
                "When things go wrong with a novel tool, there are fewer people who have seen the problem before",
            ],
        },
        {
            type: 'paragraph',
            content:
                "None of this means never adopt new tools. It means the case for adoption has to be specific and honest. 'This is newer and seems cleaner' is not a case. 'This solves a problem we have right now in a way our current tool does not, and the migration path is tractable' is a case.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'How to Evaluate a New Dependency',
        },
        {
            type: 'paragraph',
            content:
                "Before adding a library, I ask four questions. Does it solve a problem I actually have, or one I am anticipating? What is its maintenance status, and who is maintaining it? How large is it, and what does it add to the bundle? Can I remove it in six months if I need to, or does it become structural?",
        },
        {
            type: 'paragraph',
            content:
                "The last question is the most important. Dependencies that are easy to remove stay optional. Dependencies that become load-bearing are the ones that show up in migration roadmaps three years later.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Stability Compounds',
        },
        {
            type: 'paragraph',
            content:
                "A codebase built on stable foundations develops institutional knowledge. Patterns become recognizable. New team members ramp up faster. Bugs are easier to isolate because fewer things are changing at once. The team spends more time building features and less time navigating churn.",
        },
        {
            type: 'quote',
            content:
                "The goal is not to stop learning. It is to build something that is still maintainable after you stop being the one maintaining it.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Default',
        },
        {
            type: 'paragraph',
            content:
                "When in doubt, reach for the pattern you already have before introducing a new one. Write the composable before adding the library. Use the router before adding a state manager. The simplest solution that works is almost always worth trying first, and the overhead of reversing a simple decision is much lower than the overhead of reversing a structural one.",
        },
    ],
}

export default article
