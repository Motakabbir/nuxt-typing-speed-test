<template>
  <div class="card overflow-hidden">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ $t('typingTest.title') }}</h2>
      <div class="flex items-center space-x-4">
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
          Time: {{ timeElapsed }}s
        </span>
      </div>
    </div>

    <!-- Test Area -->
    <div class="space-y-6">
      <!-- Text to Type -->
      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p class="text-lg leading-relaxed" :class="{ 'text-red-500 dark:text-red-400': hasError }">
          {{ currentText }}
        </p>
      </div>

      <!-- Input Area -->
      <div class="relative">
        <textarea
          v-model="userInput"
          @input="onInput"
          @focus="startTest"
          @keydown="handleKeydown"
          class="w-full min-h-[120px] p-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          :class="{
            'border-red-500 dark:border-red-500': hasError,
            'opacity-75 cursor-not-allowed': isTestCompleted
          }"
          :disabled="isTestCompleted"
          :placeholder="$t('typingTest.placeholder', 'Start typing here...')"
        ></textarea>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="stat-card">
          <div class="text-sm text-gray-600 dark:text-gray-400">WPM</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ wpm }}</div>
        </div>
        <div class="stat-card">
          <div class="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ accuracy }}%</div>
        </div>
        <div class="stat-card">
          <div class="text-sm text-gray-600 dark:text-gray-400">Characters</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalCharacters }}</div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center" v-if="isTestCompleted">
        <button 
          @click="retryTest"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ $t('common.retry') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTypingTest } from '@/composables/useTypingTest';

const {
  currentText,
  userInput,
  wpm,
  accuracy,
  timeElapsed,
  totalCharacters,
  startTest,
  onInput,
  handleKeydown,
  retryTest,
  isTestCompleted,
  hasError,
} = useTypingTest();
</script>

<style scoped>
.stat-card {
  @apply p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center transition-colors duration-200;
}
</style>