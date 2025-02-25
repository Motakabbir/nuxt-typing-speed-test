<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">About Character & Word Counter</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="stats-card p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Character Statistics</h3>
        <ul class="space-y-2">
          <li class="flex justify-between">
            <span>Total Characters:</span>
            <span class="font-mono">{{ useTypingTest().totalCharacters }}</span>
          </li>
          <li class="flex justify-between">
            <span>Characters (no spaces):</span>
            <span class="font-mono">{{ useTypingTest().charactersNoSpaces }}</span>
          </li>
          <li class="flex justify-between">
            <span>Spaces:</span>
            <span class="font-mono">{{ useTypingTest().spaces }}</span>
          </li>
        </ul>
      </div>

      <div class="stats-card p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Word Statistics</h3>
        <ul class="space-y-2">
          <li class="flex justify-between">
            <span>Total Words:</span>
            <span class="font-mono">{{ useTypingTest().wordCount }}</span>
          </li>
          <li class="flex justify-between">
            <span>Sentences:</span>
            <span class="font-mono">{{ useTypingTest().sentenceCount }}</span>
          </li>
          <li class="flex justify-between">
            <span>Paragraphs:</span>
            <span class="font-mono">{{ useTypingTest().paragraphCount }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="prose dark:prose-invert max-w-none">
      <h2 class="text-2xl font-semibold mt-6 mb-4">How It Works</h2>
      <p class="mb-4">
        Our counter provides real-time analysis of your text with:
      </p>
      <ul class="list-disc pl-6 mb-6">
        <li>Instant character counting with space detection</li>
        <li>Smart word boundary detection</li>
        <li>Intelligent sentence and paragraph parsing</li>
        <li>Support for various writing systems</li>
        <li>Real-time statistics updates</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Multilingual Character & Word Counter',
  meta: [
    {
      name: 'description',
      content: 'Learn about our multilingual character and word counter featuring real-time counting and analysis across multiple languages.'
    }
  ]
})
</script>

<style scoped>
.stats-card {
  transition: transform 0.2s;
}
.stats-card:hover {
  transform: translateY(-2px);
}
</style>