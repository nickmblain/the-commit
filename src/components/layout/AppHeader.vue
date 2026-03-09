<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const menuOpen = ref(false)
const { isDark, toggle } = useTheme()

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
      <RouterLink to="/" class="logo" aria-label="The Commit with Nick" @click="closeMenu">
        <span class="logo__bracket" aria-hidden="true">[</span>
        <span class="logo__text">the-commit</span>
        <span class="logo__cursor" aria-hidden="true">▌</span>
        <span class="logo__bracket" aria-hidden="true">]</span>
      </RouterLink>

      <nav class="nav" aria-label="Main navigation">
        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          <!-- Sun icon: click to switch to light mode -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon: click to switch to dark mode -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

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
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.2s, border-color 0.2s;
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
  color: var(--color-heading);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.logo__bracket { color: var(--color-accent-2); }
.logo__text    { color: var(--color-heading); padding-inline: 2px; }
.logo__cursor  { color: var(--color-accent-1); animation: blink 1.1s step-end infinite; }

@keyframes blink { 50% { opacity: 0; } }

/* Nav */
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
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
  color: var(--color-heading);
  background: var(--color-nav-hover);
  text-decoration: none;
}

.nav__link.is-active { color: var(--color-accent-2); }

/* Theme toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: none;
  border: 1px solid var(--color-border);
  cursor: pointer;
  color: var(--color-muted);
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--color-heading);
  background: var(--color-nav-hover);
  border-color: var(--color-accent-2);
}

/* Mobile hamburger */
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
  .nav__toggle { display: flex; }

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

  .nav__list.is-open { display: flex; }

  .nav__link {
    padding: var(--space-3) var(--space-4);
    font-size: 1rem;
  }
}
</style>
