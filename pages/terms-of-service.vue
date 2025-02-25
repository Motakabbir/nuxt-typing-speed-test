<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('termsOfService') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('termsIntro', 'Please read these terms carefully before using our service') }}</p>
    </div>

    <div class="card space-y-8">
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('termsAcceptance') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('acceptanceContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('userConduct') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('conductContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('intellectualProperty') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('propertyContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('liability') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('liabilityContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('termination') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('terminationContent') }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>