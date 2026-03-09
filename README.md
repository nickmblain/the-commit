# The Commit with Nick

A monthly technical knowledge-sharing site. One article per month on Vue.js patterns, AI-assisted development workflows, and frontend architecture.

**Live:** [deploy URL here]

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 + Vite + TypeScript |
| Routing | Vue Router (history mode) |
| Content | Local TypeScript files in `src/data/articles/` |
| Hosting | Netlify |

No external CMS, no API keys, no environment variables required.

---

## Local Development

### Prerequisites

- Node.js 20+

### Install and run

```bash
git clone https://github.com/nickmblain/the-commit.git
cd the-commit
npm install
npm run dev
```

Dev server runs at `http://localhost:5173`.

---

## Publishing an Article

Articles live in [`src/data/articles/`](src/data/articles/). Each article is a single TypeScript file.

### 1. Create the article file

Name it `YYYY-MM-slug.ts` — e.g. `2025-04-vue-composables.ts`:

```typescript
import type { Article } from '@/types/article'

const article: Article = {
  slug: '2025-04-vue-composables',
  title: 'Your Article Title',
  date: '2025-04-01',          // ISO 8601
  excerpt: 'One or two sentences shown on the home page card.',
  tags: ['vue', 'composables'],
  readingTimeMinutes: 5,
  body: [
    {
      type: 'paragraph',
      content: 'Your opening paragraph.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'A Section Heading',
    },
    {
      type: 'code',
      language: 'typescript',
      content: `const example = ref(0)`,
    },
    {
      type: 'list',
      items: ['First point', 'Second point'],
    },
  ],
}

export default article
```

**Supported block types:**

| `type` | Required fields | Notes |
|---|---|---|
| `paragraph` | `content` | Plain text |
| `heading` | `content`, `level` (2, 3, or 4) | |
| `code` | `content`, `language` (optional) | Monospace block |
| `quote` | `content` | Styled blockquote |
| `list` | `items: string[]` | Bulleted list |
| `divider` | — | Horizontal rule |

### 2. Register the article

Open [`src/data/articles/index.ts`](src/data/articles/index.ts) and add your import:

```typescript
import article202504 from './2025-04-vue-composables'

const articles: Article[] = [article202503, article202504]
```

The list is sorted by date automatically — order doesn't matter.

### 3. Deploy

```bash
npm run build
```

Then drag the `dist/` folder into Netlify's deploy UI, or push to `main` if you have auto-deploys connected.

---

## Netlify Deployment

### First deploy

1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select your repo — build settings are already in `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

No environment variables needed.

### Manual deploy (without Git)

```bash
npm run build
# drag dist/ into Netlify's deploy drop zone
```

---

## Project Structure

```
the-commit/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── main.css            # Global CSS + light-dark() design tokens
│   ├── components/
│   │   ├── article/            # ArticleHeader, ArticleBody
│   │   ├── home/               # HeroSection, ArticleCard
│   │   ├── layout/             # AppHeader (with theme toggle), AppFooter
│   │   └── ui/                 # BlobGradient
│   ├── composables/
│   │   ├── useArticle.ts       # Look up a single article by slug
│   │   ├── useArticles.ts      # Return sorted article list
│   │   └── useTheme.ts         # Light/dark mode toggle + localStorage
│   ├── data/
│   │   └── articles/
│   │       ├── index.ts        # ← register new articles here
│   │       └── 2025-03-*.ts    # one file per article
│   ├── router/
│   │   └── index.ts
│   ├── types/
│   │   └── article.ts          # Article + ArticleBlock interfaces
│   └── views/
│       ├── HomeView.vue
│       ├── ArticleView.vue
│       ├── AboutView.vue
│       └── NotFoundView.vue
├── netlify.toml
└── package.json
```

---

## Scripts

```bash
npm run dev       # Dev server at localhost:5173
npm run build     # Type-check + build to dist/
npm run preview   # Preview the production build locally
```

---

## Light / Dark Mode

The site respects the system preference automatically via `light-dark()` CSS. Users can also toggle manually with the sun/moon button in the header — preference is persisted to `localStorage`.
