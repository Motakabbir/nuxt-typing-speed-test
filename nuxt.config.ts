import { fileURLToPath } from 'url'
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      title: 'Typing Speed Test',
      meta: [
        { name: 'description', content: 'A modern typing speed test application to measure your typing speed and accuracy.' },
        { property: 'og:title', content: 'Typing Speed Test' },
        { property: 'og:description', content: 'Test your typing speed and improve your skills with our interactive typing test.' },
        { property: 'og:image', content: '/favicon.ico' },
        { property: 'og:url', content: 'https://yourwebsite.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Typing Speed Test' },
        { name: 'twitter:description', content: 'Test your typing speed and improve your skills with our interactive typing test.' },
        { name: 'twitter:image', content: '/favicon.ico' }
      ]
    }
  },
  css: [
    '@/assets/styles/main.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap'
  ],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'es', file: 'es.json', name: 'Español' },
      { code: 'fr', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: fileURLToPath(new URL('./locales/', import.meta.url)), // Path to JSON files
    strategy: 'no_prefix', // No URL prefix needed
    detectBrowserLanguage: {
      useCookie: true, // Store selected language in a cookie
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },
  pwa: {
    manifest: {
      name: 'Multilingual Counter',
      short_name: 'MultiCount',
      description: 'Multilingual character and word counter',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    }
  },
  site: {
    url: 'https://your-domain.com'
  },
  sitemap: {
    enabled: true,
    urls: [],
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  },
  compatibilityDate: '2025-02-23',
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
    }
  }
})