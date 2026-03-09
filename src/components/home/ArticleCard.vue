<script setup lang="ts">
import type { Article } from '@/types/article'
import { RouterLink } from 'vue-router'

const props = defineProps<{ article: Article }>()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="card">
    <div class="card__meta">
      <time :datetime="props.article.date" class="card__date">
        {{ formatDate(props.article.date) }}
      </time>
      <span class="card__read-time">{{ props.article.readingTimeMinutes }} min read</span>
    </div>

    <h2 class="card__title">
      <RouterLink :to="`/articles/${props.article.slug}`" class="card__title-link">
        {{ props.article.title }}
      </RouterLink>
    </h2>

    <p class="card__excerpt">{{ props.article.excerpt }}</p>

    <div class="card__footer">
      <ul class="card__tags" role="list" aria-label="Tags">
        <li v-for="tag in props.article.tags" :key="tag">
          <span class="tag">{{ tag }}</span>
        </li>
      </ul>

      <RouterLink
        :to="`/articles/${props.article.slug}`"
        class="card__cta"
        :aria-label="`Read: ${props.article.title}`"
      >
        Read →
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top left, rgba(124 58 237 / 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.card:hover {
  border-color: rgba(124 58 237 / 0.4);
  transform: translateY(-2px);
}

.card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.card__date {
  font-size: 0.8rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
}

.card__read-time {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.card__read-time::before {
  content: '·';
  margin-right: var(--space-4);
  color: var(--color-border);
}

.card__title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}

.card__title-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.15s;
}

.card__title-link:hover {
  color: var(--color-accent-2);
  text-decoration: none;
}

.card__excerpt {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.65;
  flex: 1;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
}

.card__cta {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent-2);
  text-decoration: none;
  transition: gap 0.15s;
  white-space: nowrap;
}

.card__cta:hover {
  text-decoration: none;
  color: #fff;
}
</style>
