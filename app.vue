<template>
  <div :class="{ 'dark': isDarkMode }" :lang="$i18n.locale">
    <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDarkMode = useDarkMode()
const { locale } = useI18n()
</script>