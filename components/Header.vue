<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="container mx-auto">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Typing Speed Test
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
            active-class="text-blue-600 dark:text-blue-400 font-medium"
          >
            {{ link.text }}
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </nav>

        <!-- Mobile menu button -->
        <button 
          class="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Open menu</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden py-4 space-y-4"
      >
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to"
          class="block px-4 py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400 font-medium"
          @click="isMenuOpen = false"
        >
          {{ link.text }}
        </NuxtLink>
        <div class="px-4 py-2 flex items-center space-x-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navLinks = [
  { to: '/', text: 'Home' },
  { to: '/typing-speed-test', text: 'Test' },
  { to: '/leaderboard', text: 'Leaderboard' }
]
</script>

<style scoped>
</style>