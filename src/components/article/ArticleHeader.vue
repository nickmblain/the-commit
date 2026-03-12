<script setup lang="ts">
import type { Article } from '@/types/article'

const props = defineProps<{ article: Article }>()

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <header class="article-header">
    <div class="article-header__meta">
      <span class="article-header__author">{{ props.article.author }}</span>
      <span class="article-header__sep" aria-hidden="true">·</span>
      <time :datetime="props.article.date" class="article-header__date">
        {{ formatDate(props.article.date) }}
      </time>
      <span class="article-header__sep" aria-hidden="true">·</span>
      <span class="article-header__read-time">{{ props.article.readingTimeMinutes }} min read</span>
    </div>

    <h1 class="article-header__title">{{ props.article.title }}</h1>

    <p class="article-header__excerpt">{{ props.article.excerpt }}</p>

    <ul class="article-header__tags" role="list" aria-label="Tags">
      <li v-for="tag in props.article.tags" :key="tag">
        <span class="tag">{{ tag }}</span>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.article-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-bottom: var(--space-7);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--space-7);
}

.article-header__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.article-header__sep {
  color: var(--color-border);
}

.article-header__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--color-heading);
}

.article-header__excerpt {
  font-size: 1.125rem;
  color: var(--color-muted);
  line-height: 1.65;
}

.article-header__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
}
</style>
