<!-- Dark Mode Toggle Component -->
<template>
  <button
    @click="toggleDarkMode"
    class="group relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :title="isDarkMode ? $t('footer.lightMode') : $t('footer.darkMode')"
  >
    <!-- Sun icon -->
    <SunIcon 
      class="absolute inset-0 w-5 h-5 m-auto text-amber-500 transition-all duration-300"
      :class="isDarkMode ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'"
    />
    <!-- Moon icon -->
    <MoonIcon 
      class="absolute inset-0 w-5 h-5 m-auto text-blue-400 transition-all duration-300"
      :class="isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'"
    />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
const isDarkMode = useDarkMode()

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
.mode-switch-enter-active,
.mode-switch-leave-active {
  transition: all 0.3s ease;
}

.mode-switch-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.mode-switch-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}
</style>

<style>
.color-theme-in-transition,
.color-theme-in-transition *,
.color-theme-in-transition *:before,
.color-theme-in-transition *:after {
  transition: all 0.5s ease-out !important;
  transition-delay: 0 !important;
}
</style>