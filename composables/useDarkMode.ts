import { ref, watch } from 'vue'

export const useDarkMode = () => {
  const isDarkMode = ref(false)

  // Initialize from localStorage or system preference
  if (process.client) {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      isDarkMode.value = stored === 'true'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Watch for changes and update localStorage and document class
  watch(isDarkMode, (newValue) => {
    if (process.client) {
      localStorage.setItem('darkMode', String(newValue))
      document.documentElement.classList.toggle('dark', newValue)
    }
  }, { immediate: true })

  // Watch system preference changes
  if (process.client) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('darkMode') === null) {
        isDarkMode.value = e.matches
      }
    })
  }

  return isDarkMode
}