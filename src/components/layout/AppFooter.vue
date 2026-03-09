<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">
        &copy; {{ year }} Nick. <span class="footer__tagline">committed monthly</span>
      </p>
      <p class="footer__note">
        Built with Vue 3 + Vite. Deployed on Netlify.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  margin-top: var(--space-9);
  padding: var(--space-6) 0;
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-align: center;
}

.footer__copy {
  font-size: 0.875rem;
  color: var(--color-muted);
}

.footer__tagline {
  color: var(--color-accent-2);
  font-family: var(--font-mono);
}

.footer__note {
  font-size: 0.75rem;
  color: rgba(126 126 154 / 0.6);
}
</style>
