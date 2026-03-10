import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-10-technical-writing',
    title: 'Writing Technical Docs That People Actually Read',
    date: '2026-10-06',
    excerpt:
        'Most technical documentation fails not because it is inaccurate but because it is organized for the writer, not the reader. A few structural decisions change that.',
    tags: ['knowledge-sharing', 'dx', 'architecture'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "I have read a lot of technical documentation that was clearly written by someone who understood the system deeply and still managed to communicate almost nothing useful. The problem is almost never accuracy. It is organization. The doc covers what the author wanted to explain rather than what the reader needs to know.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Question the Reader Is Actually Asking',
        },
        {
            type: 'paragraph',
            content:
                "Before writing a single sentence, identify the question the reader is coming with. Is it 'how do I set this up for the first time'? Or 'why does it behave this way in this case'? Or 'what was the decision and what were the alternatives'? Different questions need different documents. A setup guide that also tries to explain the architectural rationale fails at both.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The ADR Format for Decisions',
        },
        {
            type: 'paragraph',
            content:
                "Architecture Decision Records are the most useful format I have found for documenting the 'why' behind technical choices. The structure is simple: context, decision, consequences. Context explains the situation and constraints. Decision states what was chosen. Consequences captures what that means going forward, including the tradeoffs.",
        },
        {
            type: 'list',
            items: [
                "Context: What was the problem? What constraints existed? What alternatives were considered?",
                "Decision: What was chosen, stated plainly",
                "Consequences: What does this enable? What does it foreclose? What will need to change as a result?",
            ],
        },
        {
            type: 'paragraph',
            content:
                "An ADR written at decision time is worth ten times one reconstructed from memory six months later. The goal is not a complete historical archive. It is enough context that someone joining the team later can understand why the codebase looks the way it does.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'The One-Screen Rule',
        },
        {
            type: 'paragraph',
            content:
                "If a reader has to scroll to find the most important information, the document is structured wrong. State the conclusion, the answer, or the core decision at the top. The detail and justification come after. This is the inverse of how most people naturally write, because writing is a process of discovery and reading is a process of retrieval. The doc needs to be organized for the reader, not for the writer's process of figuring things out.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'Code Examples Are Not Optional',
        },
        {
            type: 'paragraph',
            content:
                "For technical patterns and APIs, prose description is never enough on its own. A concrete, runnable example communicates more than three paragraphs of explanation. The example should show the exact usage pattern you want people to follow, not an abstract representation of it.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Monthly Writing Has Done for My Thinking',
        },
        {
            type: 'paragraph',
            content:
                "Seven months into this project, the most unexpected benefit has been clarity. Writing an article about a pattern forces me to articulate it precisely. That process surfaces gaps in understanding that I would not have noticed otherwise. The writing is not just a record of what I know. It is part of how I figure out what I know.",
        },
        {
            type: 'quote',
            content:
                "If you cannot write it down clearly, you do not understand it clearly. The document is the test.",
        },
    ],
}

export default article
