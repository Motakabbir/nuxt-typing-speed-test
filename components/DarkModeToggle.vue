<template>
  <button
    @click="toggleDarkMode"
    class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
           hover:bg-gray-200 dark:hover:bg-gray-600
           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
           dark:focus:ring-offset-gray-800 overflow-hidden group"
    :aria-label="t('darkMode.toggleLight')"
    role="switch"
    :aria-checked="isDark"
  >
    <div class="relative z-10 flex items-center justify-center">
      <Transition 
        name="mode-switch" 
        mode="out-in"
      >
        <SunIcon
          v-if="isDark"
          class="h-5 w-5 text-yellow-500"
          aria-hidden="true"
        />
        <MoonIcon
          v-else
          class="h-5 w-5 text-gray-900 dark:text-gray-300"
          aria-hidden="true"
        />
      </Transition>
    </div>
    
    <!-- Animated background -->
    <div 
      class="absolute inset-0 transition-colors duration-500"
      :class="[
        isDark 
          ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 to-gray-100'
      ]"
    >
      <div 
        class="absolute inset-0 transition-opacity duration-500"
        :class="[
          isDark 
            ? 'opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_60%)]' 
            : 'opacity-0'
        ]"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
const isDark = useDarkMode()
const { t } = useI18n()

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (process.client) {
    localStorage.setItem('darkMode', String(isDark.value))
    
    // Add a smooth transition class to the body
    document.documentElement.classList.add('color-theme-in-transition')
    setTimeout(() => {
      document.documentElement.classList.remove('color-theme-in-transition')
    }, 1000)
  }
}

// Load preferred theme on mount
onMounted(() => {
  if (process.client) {
    const stored = localStorage.getItem('darkMode')
    if (stored) {
      isDark.value = stored === 'true'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
})
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