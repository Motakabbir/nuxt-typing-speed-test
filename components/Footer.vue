<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
    <div class="container mx-auto py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Typing Speed Test</h3>
          <p class="text-gray-600 dark:text-gray-400">&copy; {{ currentYear }} All rights reserved.</p>
        </div>
        
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
          <div class="space-y-2">
            <NuxtLink to="/" class="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Home</NuxtLink>
            <NuxtLink to="/typing-speed-test" class="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Take Test</NuxtLink>
            <NuxtLink to="/leaderboard" class="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Leaderboard</NuxtLink>
          </div>
        </div>
        
        <div class="text-center md:text-right">
          <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
          <div class="space-y-2">
            <NuxtLink to="/privacy-policy" class="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms-of-service" class="block text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Terms of Service</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>