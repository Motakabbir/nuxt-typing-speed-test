import { defineStore } from 'pinia'

interface UserPreferences {
  testDuration: number
  showInstantFeedback: boolean
  soundEnabled: boolean
}

export const useAppStore = defineStore('app', {
  state: () => ({
    preferences: {
      testDuration: 60,
      showInstantFeedback: true,
      soundEnabled: true
    } as UserPreferences,
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    updatePreferences(newPreferences: Partial<UserPreferences>) {
      this.preferences = { ...this.preferences, ...newPreferences }
      if (process.client) {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences))
      }
    },

    loadPreferences() {
      if (process.client) {
        const stored = localStorage.getItem('userPreferences')
        if (stored) {
          try {
            this.preferences = { ...this.preferences, ...JSON.parse(stored) }
          } catch (e) {
            console.error('Error loading preferences:', e)
          }
        }
      }
    },

    setLoading(status: boolean) {
      this.isLoading = status
    },

    setError(error: string | null) {
      this.error = error
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode
      document.documentElement.classList.toggle('dark', this.darkMode)
    }
  }
})