<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useArticle } from '@/composables/useArticle'
import ArticleHeader from '@/components/article/ArticleHeader.vue'
import ArticleBody from '@/components/article/ArticleBody.vue'
import BlobGradient from '@/components/ui/BlobGradient.vue'

const route = useRoute()
const slug = computed(() => {
  const s = route.params['slug']
  return Array.isArray(s) ? s[0] ?? '' : s ?? ''
})

const { article, loading, error } = useArticle(slug.value)
</script>

<template>
  <main id="main-content">
    <div v-if="loading" class="loading-state container container--narrow" aria-live="polite" aria-busy="true">
      <span class="sr-only">Loading article…</span>
      <div class="skeleton skeleton--title" aria-hidden="true" />
      <div class="skeleton skeleton--body" aria-hidden="true" />
      <div class="skeleton skeleton--body" aria-hidden="true" />
    </div>

    <div v-else-if="error" class="error-state container container--narrow" role="alert">
      <p>{{ error }}</p>
      <RouterLink to="/" class="back-link">← Back to home</RouterLink>
    </div>

    <div v-else-if="article" class="article-page">
      <BlobGradient variant="violet" position="top-right" size="md" :opacity="0.2" />

      <div class="container container--narrow article-page__inner">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/" class="breadcrumb__link">Home</RouterLink>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span class="breadcrumb__current" aria-current="page">{{ article.title }}</span>
        </nav>

        <ArticleHeader :article="article" />
        <ArticleBody :article="article" />

        <footer class="article-page__footer">
          <RouterLink to="/" class="back-link">← Back to all articles</RouterLink>
        </footer>
      </div>
    </div>

    <div v-else class="not-found-state container container--narrow">
      <p class="not-found-state__code" aria-hidden="true">404</p>
      <h1 class="not-found-state__heading">Article not found</h1>
      <p class="not-found-state__message">That slug doesn't match anything in the archive.</p>
      <RouterLink to="/" class="back-link">← Back to home</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.article-page {
  position: relative;
  overflow: hidden;
  padding: var(--space-8) 0;
}

.article-page__inner {
  position: relative;
  z-index: 1;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-7);
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--color-muted);
}

.breadcrumb__link {
  color: var(--color-accent-2);
  text-decoration: none;
}

.breadcrumb__link:hover {
  text-decoration: underline;
}

.breadcrumb__sep {
  color: var(--color-border);
}

.breadcrumb__current {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.article-page__footer {
  margin-top: var(--space-8);
  padding-top: var(--space-7);
  border-top: 1px solid var(--color-border);
}

.back-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.back-link:hover {
  color: var(--color-accent-2);
  text-decoration: none;
}

/* 404 state */
.not-found-state {
  padding: var(--space-9) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.not-found-state__code {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent-1);
  letter-spacing: 0.1em;
}

.not-found-state__heading {
  font-size: 2rem;
  color: var(--color-heading);
}

.not-found-state__message {
  color: var(--color-muted);
}

/* Loading skeleton */
.loading-state {
  padding: var(--space-8) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.skeleton {
  border-radius: var(--radius-md);
  background: linear-gradient(
    90deg,
    var(--color-skeleton-lo) 0%,
    var(--color-skeleton-hi) 50%,
    var(--color-skeleton-lo) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton--title  { height: 80px; }
.skeleton--body   { height: 120px; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Error state */
.error-state {
  padding: var(--space-8) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  color: #f87171;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
