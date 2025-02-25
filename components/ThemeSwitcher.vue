<!-- Theme Switcher Component -->
<template>
  <button 
    @click="appStore.toggleDarkMode()" 
    class="group relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :title="appStore.darkMode ? $t('footer.lightMode') : $t('footer.darkMode')"
  >
    <!-- Sun icon -->
    <SunIcon 
      class="absolute inset-0 w-5 h-5 m-auto text-amber-500 transition-all duration-300"
      :class="appStore.darkMode ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'"
    />
    <!-- Moon icon -->
    <MoonIcon 
      class="absolute inset-0 w-5 h-5 m-auto text-blue-400 transition-all duration-300"
      :class="appStore.darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'"
    />
  </button>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const appStore = useAppStore()
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