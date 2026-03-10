import type { Article } from '@/types/article'

const article: Article = {
    slug: '2026-12-year-in-review',
    title: 'A Year of Monthly Articles: What Actually Changed',
    date: '2026-12-09',
    excerpt:
        'Ten articles in, here is what I expected this project to do, what it actually did, and what I am carrying into next year.',
    tags: ['meta', 'knowledge-sharing', 'ai'],
    readingTimeMinutes: 5,
    body: [
        {
            type: 'paragraph',
            content:
                "When I started The Commit in March, the stated goal was one written knowledge-sharing resource per month. That was the commitment on paper. What I did not anticipate was how much the constraint of writing regularly would change how I think about the work itself.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What I Expected',
        },
        {
            type: 'paragraph',
            content:
                "I expected the writing to be mostly documentation: capturing patterns I already knew and presenting them clearly. A record of existing knowledge, useful to others, but not particularly generative for me.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Actually Happened',
        },
        {
            type: 'paragraph',
            content:
                "The articles that taught me the most were the ones I thought I understood before I started writing them. Composables in depth. Accessible components. TypeScript patterns in Vue 3. Each one started as 'I know this, I just need to write it down' and ended as 'I now understand this in a way I did not before.' The precision that writing demands surfaces gaps that fluency hides.",
        },
        {
            type: 'paragraph',
            content:
                "The CLAUDE.md article in March was the clearest example. I had been using Claude Code for months. I thought I had a mature workflow. Writing it down forced me to articulate exactly what the file does, why each rule exists, and what the failure modes are without it. The article is better documentation of my AI workflow than anything I had before it.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Surprised Me',
        },
        {
            type: 'list',
            items: [
                "Writing publicly raises the bar. Knowing something will be read makes you more honest about what you actually know versus what you assume.",
                "The monthly cadence is the right constraint. Weekly would be too much. Quarterly would allow too much drift. Monthly is enough pressure to stay sharp without becoming the main thing.",
                "The articles have a way of compounding on each other. The composables article in April made the TypeScript article in August easier to write, because the patterns already had a shared vocabulary.",
                "AI tooling improved my writing speed without improving my thinking speed. The bottleneck was always clarity, not words per minute.",
            ],
        },
        {
            type: 'heading',
            level: 2,
            content: 'The Honest Assessment',
        },
        {
            type: 'paragraph',
            content:
                "Not every article was as sharp as I wanted it to be. The performance article in June covered the right ground but stayed more checklist than insight. The boring architecture piece in September said something true but could have been more specific about the actual decisions I have made. Writing monthly means shipping before things are perfect, which is the right tradeoff but not always a comfortable one.",
        },
        {
            type: 'heading',
            level: 2,
            content: 'What Carries Into Next Year',
        },
        {
            type: 'paragraph',
            content:
                "The habit stays. One article per month, topics that connect to real work. The criteria for a good article remains the same: would a developer joining the team find this useful six months from now? If yes, ship it. If it is just logging what I did, make it better or wait for a more interesting angle.",
        },
        {
            type: 'paragraph',
            content:
                "Topics I want to get to in 2027: testing Vue composables properly, building design systems that stay consistent, and the honest accounting of where AI tooling saves time versus where it creates the illusion of speed.",
        },
        {
            type: 'quote',
            content:
                "The best thing about committing to write regularly is that it forces you to keep having things worth writing about.",
        },
        {
            type: 'paragraph',
            content:
                "See you in January.",
        },
    ],
}

export default article
