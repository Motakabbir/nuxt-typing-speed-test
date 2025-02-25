import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLangStore = defineStore('lang', {
  state: () => ({
    locale: process.client ? (localStorage.getItem('locale') || 'en') : 'en'
  }),
  actions: {
    setLocale(newLocale: string) {
      this.locale = newLocale
      localStorage.setItem('locale', newLocale)
    }
  }
})
