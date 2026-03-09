<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main id="main-content" class="not-found">
    <div class="container not-found__inner">
      <p class="not-found__code" aria-hidden="true">404</p>
      <h1 class="not-found__heading">Page not found</h1>
      <p class="not-found__message">
        This path doesn't exist in the repo. Maybe the route was renamed or the link is stale.
      </p>
      <RouterLink to="/" class="not-found__home">← Back to home</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  padding: var(--space-9) 0;
}

.not-found__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 480px;
}

.not-found__code {
  font-family: var(--font-mono);
  font-size: 5rem;
  font-weight: 800;
  color: rgba(124 58 237 / 0.25);
  line-height: 1;
  letter-spacing: -0.05em;
}

.not-found__heading {
  font-size: 2rem;
}

.not-found__message {
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.not-found__home {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-accent-2);
  text-decoration: none;
}

.not-found__home:hover {
  text-decoration: underline;
}
</style>
