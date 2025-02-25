<template>
  <div class="max-w-6xl mx-auto py-8 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('typingTest') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('typingTestDescription', 'Test your typing speed and accuracy') }}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <div class="lg:col-span-2">
        <TypingTest />
      </div>
    </div>
  </div>
</template>

<script setup>
import TypingTest from '@/components/TypingTest.vue';

useHead({
  title: 'Typing Speed Test with Character Analysis',
  meta: [
    {
      name: 'description',
      content: 'Test your typing speed with real-time character and word analysis, supporting multiple languages.'
    }
  ]
});
</script>

<style scoped>
.typing-test {
  @apply max-w-xl mx-auto p-5 border border-gray-300 rounded-lg bg-gray-100;
}

.test-area {
  @apply flex flex-col items-center;
}

.test-text {
  @apply text-lg mb-2;
}

.input-area {
  @apply w-full h-24 p-2 border border-gray-300 rounded resize-none;
}

.test-info {
  @apply mt-2;
}

.retry-button {
  @apply mt-5 px-5 py-2 bg-green-500 text-white border-none rounded cursor-pointer;
}

.stats-card {
  transition: transform 0.2s;
}
.stats-card:hover {
  transform: translateY(-2px);
}
</style>