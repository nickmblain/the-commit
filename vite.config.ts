import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { articles } from './src/data/articles'

const SITE_URL = 'https://the-commit.netlify.app'

// Emits /feed.json at build time: published article metadata, newest first.
// Consumed by external sites (e.g. the portfolio) to show recent posts.
const generateFeed = (): Plugin => ({
  name: 'generate-feed',
  apply: 'build',
  generateBundle() {
    const today = new Date().toISOString().split('T')[0]
    const posts = [...articles]
      .filter((a) => a.date <= today)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        date: a.date,
        excerpt: a.excerpt,
        tags: a.tags,
        readingTimeMinutes: a.readingTimeMinutes,
        url: `${SITE_URL}/articles/${a.slug}`,
      }))
    this.emitFile({
      type: 'asset',
      fileName: 'feed.json',
      source: JSON.stringify({ site: 'The Commit with Nick', url: SITE_URL, generated: today, posts }, null, 2),
    })
  },
})

export default defineConfig({
  plugins: [vue(), generateFeed()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
