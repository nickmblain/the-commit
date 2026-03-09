<script setup lang="ts">
import BlobGradient from '@/components/ui/BlobGradient.vue'
</script>

<template>
  <main id="main-content" class="about-page">
    <BlobGradient variant="cyan" position="top-right" size="md" :opacity="0.2" />
    <BlobGradient variant="violet" position="bottom-left" size="sm" :opacity="0.15" />

    <div class="container container--narrow about-page__inner">
      <header class="about-header">
        <div class="about-header__avatar" aria-hidden="true">N</div>
        <div>
          <h1 class="about-header__name">Nick</h1>
          <p class="about-header__role">Frontend Developer · Vue Specialist</p>
        </div>
      </header>

      <section class="about-section" aria-labelledby="about-goal">
        <h2 id="about-goal" class="about-section__title">The Goal</h2>
        <p>
          This site exists to satisfy a commitment: contribute at least one written
          knowledge-sharing resource per month. README updates, technical docs, code
          comments, wiki articles — something that outlasts the context of a single sprint.
        </p>
        <p>
          The focus areas are Vue.js patterns, AI-assisted development workflows,
          and the architecture of systems I work on day to day. The target is a peer
          feedback score of 4.5/5 or better and completed quarterly self-assessments
          with documented improvement actions.
        </p>
        <p>
          Writing is the work. The commit history is the proof.
        </p>
      </section>

      <section class="about-section" aria-labelledby="about-topics">
        <h2 id="about-topics" class="about-section__title">What You'll Find Here</h2>
        <ul class="about-list">
          <li>
            <span class="about-list__icon" aria-hidden="true">▸</span>
            <strong>Vue 3 Patterns</strong> — Composition API, composables, performance,
            and architecture decisions in real SPA contexts.
          </li>
          <li>
            <span class="about-list__icon" aria-hidden="true">▸</span>
            <strong>AI Workflows</strong> — What actually helps vs. what creates noise
            when using AI tooling in a professional dev environment.
          </li>
          <li>
            <span class="about-list__icon" aria-hidden="true">▸</span>
            <strong>Architecture Notes</strong> — Decisions, trade-offs, and patterns
            in maintainable frontend systems.
          </li>
          <li>
            <span class="about-list__icon" aria-hidden="true">▸</span>
            <strong>Quarterly Reflections</strong> — Self-assessment notes and
            documented improvement actions.
          </li>
        </ul>
      </section>

      <section class="about-section" aria-labelledby="about-cadence">
        <h2 id="about-cadence" class="about-section__title">Cadence</h2>
        <p>
          One article per month, published at the start of each month. No newsletter,
          no algorithm — just a commit log you can read.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.about-page {
  position: relative;
  overflow: hidden;
  padding: var(--space-8) 0 var(--space-9);
}

.about-page__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.about-header {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.about-header__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-1), var(--color-accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-heading);
  flex-shrink: 0;
}

.about-header__name {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-heading);
}

.about-header__role {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-accent-2);
  margin-top: var(--space-1);
}

.about-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-section__title {
  font-size: 1rem;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--color-accent-1);
  text-transform: lowercase;
}

.about-section__title::before {
  content: '// ';
  color: var(--color-muted);
}

.about-section p {
  font-size: 1.0625rem;
  color: var(--color-text);
  line-height: 1.8;
}

.about-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
}

.about-list li {
  display: flex;
  gap: var(--space-3);
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--color-text);
}

.about-list__icon {
  color: var(--color-accent-2);
  flex-shrink: 0;
  margin-top: 2px;
}

.about-list strong {
  color: var(--color-heading);
}
</style>
