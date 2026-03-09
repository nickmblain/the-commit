<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const navLinks = [
  { name: 'home', label: 'Home', to: '/' },
  { name: 'about', label: 'About', to: '/about' },
] as const

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="logo" aria-label="The Commit with Nick — home" @click="closeMenu">
        <span class="logo__bracket" aria-hidden="true">[</span>
        <span class="logo__text">the-commit</span>
        <span class="logo__cursor" aria-hidden="true">▌</span>
        <span class="logo__bracket" aria-hidden="true">]</span>
      </RouterLink>

      <nav class="nav" aria-label="Main navigation">
        <button
          class="nav__toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="nav-menu"
          @click="toggleMenu"
        >
          <span class="sr-only">{{ menuOpen ? 'Close menu' : 'Open menu' }}</span>
          <span class="nav__hamburger" :class="{ 'is-open': menuOpen }" aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>

        <ul id="nav-menu" class="nav__list" :class="{ 'is-open': menuOpen }" role="list">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink
              :to="link.to"
              class="nav__link"
              :class="{ 'is-active': route.path === link.to }"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--color-border);
  background: rgba(9 9 15 / 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  letter-spacing: -0.01em;
}

.logo__bracket {
  color: var(--color-accent-2);
}

.logo__text {
  color: #fff;
  padding-inline: 2px;
}

.logo__cursor {
  color: var(--color-accent-1);
  animation: blink 1.1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
}

.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
}

.nav__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-muted);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}

.nav__link:hover,
.nav__link.is-active {
  color: #fff;
  background: rgba(255 255 255 / 0.06);
  text-decoration: none;
}

.nav__link.is-active {
  color: var(--color-accent-2);
}

/* Mobile toggle */
.nav__toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  color: var(--color-text);
}

.nav__hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.nav__hamburger span {
  display: block;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

.nav__hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav__hamburger.is-open span:nth-child(2) { opacity: 0; }
.nav__hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 600px) {
  .nav__toggle {
    display: flex;
  }

  .nav__list {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--space-4);
    gap: var(--space-2);
  }

  .nav__list.is-open {
    display: flex;
  }

  .nav__link {
    padding: var(--space-3) var(--space-4);
    font-size: 1rem;
  }
}
</style>
