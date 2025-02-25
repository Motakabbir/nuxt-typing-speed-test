<template>
  <header class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/20 dark:border-gray-700/20">
    <nav class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo/Brand -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform duration-200">
          {{ $t('typingTest.title') }}
        </NuxtLink>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="relative text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 group"
          >
            {{ $t(link.label) }}
            <span class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 dark:bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
          </NuxtLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Language Switcher -->
          <LanguageSwitcher />
          
          <!-- Dark Mode Toggle -->
          <DarkModeToggle />
          
          <!-- Auth Buttons -->
          <template v-if="!isAuthenticated">
            <button
              @click="showAuthModal = true"
              class="flex items-center px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white hover:shadow-md transition-all duration-200"
            >
              <UserIcon class="w-5 h-5 mr-2" />
              {{ $t('nav.login') }}
            </button>
          </template>
          <template v-else>
            <div class="relative" v-click-outside="closeUserMenu">
              <button
                @click="toggleUserMenu"
                class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
              >
                <span class="text-gray-700 dark:text-gray-300">{{ user?.email }}</span>
                <ChevronDownIcon 
                  class="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': isUserMenuOpen }"
                />
              </button>
              <!-- User Menu Dropdown -->
              <div
                v-show="isUserMenuOpen"
                class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
              >
                <button
                  @click="handleSignOut"
                  class="flex items-center w-full px-4 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <ArrowRightOnRectangleIcon class="w-5 h-5 mr-2" />
                  {{ $t('nav.logout') }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <!-- Auth Modal -->
    <AuthModal
      v-if="showAuthModal"
      :is-open="showAuthModal"
      @close="showAuthModal = false"
      @auth-success="onAuthSuccess"
    />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { UserIcon, ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const { isAuthenticated, user, signOut } = useAuth()
const showAuthModal = ref(false)
const isUserMenuOpen = ref(false)

const navigationLinks = [
  { to: '/typing-speed-test', label: 'nav.typingTest' },
  { to: '/leaderboard', label: 'nav.leaderboard' },
  { to: '/about', label: 'nav.about' }
]

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleSignOut = async () => {
  await signOut()
  closeUserMenu()
}

const onAuthSuccess = () => {
  showAuthModal.value = false
}

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement & { clickOutsideEvent?: (event: Event) => void }) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  }
}
</script>