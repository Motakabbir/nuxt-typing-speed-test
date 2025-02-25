<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="text-center py-16 sm:py-20">
      <h1 class="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('welcome') }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        {{ $t('typingTest') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <NuxtLink 
          to="/typing-speed-test" 
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {{ $t('startTest') }}
        </NuxtLink>
        <NuxtLink 
          to="/leaderboard" 
          class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold shadow transition-all duration-200"
        >
          {{ $t('leaderboard') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="grid md:grid-cols-3 gap-8">
      <div class="card text-center">
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ $t('feature1Title', 'Real-time Speed') }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('feature1Text', 'Get instant feedback on your typing speed and accuracy') }}</p>
      </div>

      <div class="card text-center">
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ $t('feature2Title', 'Global Rankings') }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('feature2Text', 'Compete with typists from around the world') }}</p>
      </div>

      <div class="card text-center">
        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">{{ $t('feature3Title', 'Multiple Languages') }}</h3>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('feature3Text', 'Practice typing in different languages') }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
</style>