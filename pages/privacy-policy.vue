<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('privacyPolicy') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('privacyPolicyIntro', 'How we handle and protect your data') }}</p>
    </div>

    <div class="card space-y-8">
      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('dataCollection') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('privacyPolicyContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('dataSecurity') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('securityContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('dataUsage') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('usageContent') }}</p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{{ $t('cookies') }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ $t('cookiesContent') }}</p>
      </section>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped>
</style>