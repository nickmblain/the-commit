<script setup lang="ts">
import BlobGradient from '@/components/ui/BlobGradient.vue'
</script>

<template>
  <section class="hero" aria-labelledby="hero-heading">
    <BlobGradient variant="violet" position="top-right" :opacity="0.3" />
    <BlobGradient variant="cyan" position="bottom-left" size="md" :opacity="0.2" />

    <div class="hero__content">
      <p class="hero__eyebrow">
        <span class="hero__eyebrow-dot" aria-hidden="true" />
        Monthly knowledge-sharing by Nick
      </p>

      <h1 id="hero-heading" class="hero__title">
        <span class="hero__title-main">The Commit</span>
        <span class="hero__title-accent">with Nick</span>
      </h1>

      <p class="hero__description">
        One article a month on Vue.js patterns, AI-assisted development workflows,
        and building things that last. Committed, not cached.
      </p>

      <div class="hero__badges" aria-label="Topics covered">
        <span class="badge">Vue 3</span>
        <span class="badge">TypeScript</span>
        <span class="badge">AI Workflows</span>
        <span class="badge">Architecture</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: var(--space-9) 0 var(--space-8);
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.hero__eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent-2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hero__eyebrow-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent-2);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent-2);
  flex-shrink: 0;
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-accent-2); }
  50%       { opacity: 0.5; box-shadow: 0 0 16px var(--color-accent-2); }
}

.hero__title {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero__title-main {
  color: var(--color-heading);
  display: block;
}

/* Gradient spans the full content width, not just the text width */
.hero__title-accent {
  display: block;
  width: 100%;
  background: linear-gradient(90deg, var(--color-accent-1) 0%, var(--color-accent-2) 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__description {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 560px;
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  padding: var(--space-1) var(--space-3);
  border-radius: 999px;
  background: var(--color-nav-hover);
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  letter-spacing: 0.02em;
}
</style>
