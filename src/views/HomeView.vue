<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import ArticleCard from '@/components/home/ArticleCard.vue'
import { useArticles } from '@/composables/useArticles'

const { articles, loading, error } = useArticles()
</script>

<template>
  <main id="main-content">
    <div class="container">
      <HeroSection />
    </div>

    <section class="articles-section" aria-labelledby="articles-heading">
      <div class="container">
        <div class="articles-section__header">
          <h2 id="articles-heading" class="articles-section__title">
            <span class="articles-section__title-prefix" aria-hidden="true">// </span>articles
          </h2>
          <span v-if="!loading" class="articles-section__count">{{ articles.length }} published</span>
        </div>

        <div v-if="loading" class="articles-loading" aria-live="polite" aria-busy="true">
          <span class="sr-only">Loading articles…</span>
          <div class="skeleton" v-for="n in 2" :key="n" aria-hidden="true" />
        </div>

        <p v-else-if="error" class="articles-error" role="alert">{{ error }}</p>

        <div v-else-if="articles.length > 0" class="articles-grid" role="list">
          <div v-for="article in articles" :key="article.slug" role="listitem">
            <ArticleCard :article="article" />
          </div>
        </div>

        <div v-else class="articles-empty">
          <p>No articles yet — check back next commit.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.articles-section {
  padding-bottom: var(--space-9);
}

.articles-section__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.articles-section__title {
  font-size: 1.1rem;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--color-muted);
  text-transform: lowercase;
}

.articles-section__title-prefix {
  color: var(--color-accent-1);
}

.articles-section__count {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-muted);
  background: rgba(255 255 255 / 0.04);
  border: 1px solid var(--color-border);
  padding: 2px var(--space-3);
  border-radius: 999px;
}

.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

.articles-empty,
.articles-error {
  color: var(--color-muted);
  font-style: italic;
  padding: var(--space-7) 0;
  text-align: center;
}

.articles-error {
  color: #f87171;
}

.articles-loading {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.skeleton {
  height: 200px;
  border-radius: var(--radius-lg);
  background: linear-gradient(
    90deg,
    var(--color-skeleton-lo) 0%,
    var(--color-skeleton-hi) 50%,
    var(--color-skeleton-lo) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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
