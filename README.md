# The Commit with Nick

A monthly technical knowledge-sharing site. One article per month on Vue.js patterns, AI-assisted development workflows, and frontend architecture.

**Live:** [deploy URL here]
**CMS:** [manage.sanity.io](https://manage.sanity.io)

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 + Vite + TypeScript |
| Routing | Vue Router (history mode) |
| Content | Sanity.io (headless CMS) |
| Rendering | `@portabletext/vue` |
| Hosting | Netlify |

---

## Local Development

### Prerequisites

- Node.js 20+
- A Sanity.io project (see [Sanity Setup](#sanity-setup) below)

### 1. Clone and install

```bash
git clone https://github.com/nickmblain/the-commit.git
cd the-commit
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity credentials:

```bash
cp .env.example .env.local
```

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

> `.env.local` is gitignored. Never commit it.

### 3. Start dev server

```bash
npm run dev
```

---

## Sanity Setup

Sanity is used as the headless CMS. Articles are authored in Sanity Studio and fetched via the Sanity CDN at build/runtime.

### Create a Sanity project

1. Go to [sanity.io](https://www.sanity.io) and sign in
2. Create a new project — choose the **blank** template
3. Note your **Project ID** and set **Dataset** to `production`

### Install Sanity CLI and create a Studio

```bash
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production --template clean
```

This creates a `studio/` directory. Run `npm run dev` inside it to open Studio locally.

### Article schema

Add this schema to your Studio's `schemaTypes/` directory as `article.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'readingTimeMinutes',
      type: 'number',
      title: 'Reading time (minutes)',
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [
        { type: 'block' },
        {
          type: 'code',
          options: { language: 'typescript', languageAlternatives: [
            { title: 'TypeScript', value: 'typescript' },
            { title: 'JavaScript', value: 'javascript' },
            { title: 'Vue', value: 'vue' },
            { title: 'Bash', value: 'bash' },
            { title: 'JSON', value: 'json' },
          ]},
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
})
```

Then register it in `schemaTypes/index.ts`:

```typescript
import { articleType } from './article'
export const schemaTypes = [articleType]
```

> The `code` block type requires the `@sanity/code-input` plugin:
> ```bash
> npm install @sanity/code-input
> ```
> And register it in `sanity.config.ts`:
> ```typescript
> import { codeInput } from '@sanity/code-input'
> plugins: [structureTool(), codeInput()]
> ```

### CORS for localhost

In [manage.sanity.io](https://manage.sanity.io) → your project → **API** → **CORS Origins**, add:

- `http://localhost:5173` (dev)
- Your Netlify domain (production)

---

## Publishing an Article

1. Open Sanity Studio (`npm run dev` in the `studio/` directory, or use the hosted Studio URL)
2. Create a new **Article** document
3. Fill in title, slug (auto-generated), published date, excerpt, tags, and body
4. Click **Publish**
5. The site fetches live from Sanity's CDN — no redeploy needed

---

## Netlify Deployment

### First deploy

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Under **Site settings → Environment variables**, add:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
6. Deploy

### Subsequent deploys

Push to `main` → Netlify auto-builds. Or drag-and-drop `dist/` in the Netlify UI after running `npm run build` locally.

> **Note:** Articles publish instantly via Sanity CDN without a redeploy — no action needed after publishing in Studio.

---

## Project Structure

```
the-commit/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── main.css          # Global CSS + design tokens
│   ├── components/
│   │   ├── article/          # ArticleHeader, ArticleBody (PortableText)
│   │   ├── home/             # HeroSection, ArticleCard
│   │   ├── layout/           # AppHeader, AppFooter
│   │   └── ui/               # BlobGradient
│   ├── composables/
│   │   ├── useArticle.ts     # Fetch single article by slug
│   │   └── useArticles.ts    # Fetch all articles
│   ├── router/
│   │   └── index.ts
│   ├── sanity/
│   │   ├── client.ts         # Sanity client (reads from env vars)
│   │   └── queries.ts        # GROQ queries
│   ├── types/
│   │   └── article.ts        # Article interface
│   └── views/
│       ├── HomeView.vue
│       ├── ArticleView.vue
│       ├── AboutView.vue
│       └── NotFoundView.vue
├── .env.example
├── netlify.toml
└── package.json
```

---

## Scripts

```bash
npm run dev       # Start dev server at localhost:5173
npm run build     # Type-check + build to dist/
npm run preview   # Preview the production build locally
```
