<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {{ $t('home.hero.title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {{ $t('home.hero.description') }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/typing-speed-test"
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {{ $t('home.hero.startTest') }}
            </NuxtLink>
            <NuxtLink
              to="/leaderboard"
              class="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {{ $t('home.hero.viewLeaderboard') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {{ $t('home.features.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400">
                <component :is="feature.icon" />
              </div>
              <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {{ $t(feature.title) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ $t(feature.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-blue-600 dark:bg-blue-900">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          {{ $t('home.cta.title') }}
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          {{ $t('home.cta.description') }}
        </p>
        <NuxtLink
          to="/typing-speed-test"
          class="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {{ $t('home.cta.button') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const IconSpeed = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  `
}

const IconLanguage = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  `
}

const IconLeaderboard = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  `
}

const features = [
  {
    icon: 'IconSpeed',
    title: 'home.features.speed.title',
    description: 'home.features.speed.description'
  },
  {
    icon: 'IconLanguage',
    title: 'home.features.language.title',
    description: 'home.features.language.description'
  },
  {
    icon: 'IconLeaderboard',
    title: 'home.features.leaderboard.title',
    description: 'home.features.leaderboard.description'
  }
]

useHead({
  title: 'Home - Typing Speed Test',
  meta: [
    {
      name: 'description',
      content: 'Test and improve your typing speed with our multilingual typing speed test. Track your progress and compete with others worldwide.'
    }
  ]
})
</script>

<style scoped>
</style>