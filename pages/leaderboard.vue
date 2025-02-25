<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('leaderboard.title') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t('leaderboard.description') }}
      </p>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="text-gray-600 dark:text-gray-400">{{ $t('common.loading') }}</div>
    </div>
    <template v-else>
      <div v-if="!isAuthenticated" class="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p class="text-yellow-800 dark:text-yellow-200 text-center">
          {{ $t('leaderboard.loginToParticipate') }}
        </p>
        <div class="mt-4 flex justify-center gap-4">
          <button
            @click="showAuthModal = true"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {{ $t('nav.login') }}
          </button>
        </div>
      </div>

      <Leaderboard />
    </template>

    <!-- Auth Modal -->
    <AuthModal
      v-if="showAuthModal"
      :is-open="showAuthModal"
      @close="showAuthModal = false"
      @auth-success="onAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()
const showAuthModal = ref(false)

useHead({
  title: 'Leaderboard - Typing Speed Test',
  meta: [
    {
      name: 'description',
      content: 'View the global typing speed test leaderboard and see how you rank against other typists.'
    }
  ]
})

const onAuthSuccess = () => {
  showAuthModal.value = false
}
</script>