<template>
  <button 
    @click="appStore.toggleDarkMode()" 
    class="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :title="appStore.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <span class="sr-only">{{ appStore.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}</span>
    
    <!-- Sun icon -->
    <svg 
      class="w-5 h-5 text-yellow-500 transition-all duration-300"
      :class="appStore.darkMode ? 'opacity-0 scale-50' : 'opacity-100 scale-100'"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    
    <!-- Moon icon -->
    <svg 
      class="absolute w-5 h-5 text-blue-400 transition-all duration-300"
      :class="appStore.darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
</script>

<style scoped>
.theme-toggle {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>