import { ref, computed, onMounted } from 'vue'

type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'the-commit-theme'

// Module-level so the preference is shared across all component instances
const preference = ref<ThemePreference>('system')

function applyPreference(pref: ThemePreference) {
  const html = document.documentElement
  if (pref === 'system') {
    html.removeAttribute('data-theme')
  } else {
    html.setAttribute('data-theme', pref)
  }
}

function resolvedIsDark(pref: ThemePreference): boolean {
  if (pref === 'dark') return true
  if (pref === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null
    preference.value = stored ?? 'system'
    // The inline script in index.html already set data-theme to prevent FOUC,
    // but we sync the ref here in case it wasn't stored yet.
    applyPreference(preference.value)
  })

  function toggle() {
    const next = resolvedIsDark(preference.value) ? 'light' : 'dark'
    preference.value = next
    localStorage.setItem(STORAGE_KEY, next)
    applyPreference(next)
  }

  const isDark = computed(() => resolvedIsDark(preference.value))

  return { preference, isDark, toggle }
}
