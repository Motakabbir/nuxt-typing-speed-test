<template>
  <footer class="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50 mt-8 border-t border-gray-200/20 dark:border-gray-700/20">
    <div class="container mx-auto px-6 pt-12 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('footer.links') }}
          </h3>
          <ul class="space-y-4">
            <li v-for="link in ['about', 'privacy', 'terms']" :key="link">
              <NuxtLink 
                :to="`/${link === 'about' ? link : link === 'privacy' ? 'privacy-policy' : 'terms-of-service'}`"
                class="group inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ $t(`footer.${link}`) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Language Selector -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('footer.language') }}
          </h3>
          <div class="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 shadow-sm">
            <LanguageSwitcher />
          </div>
        </div>

        <!-- Theme Toggle -->
        <div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-6">
            {{ $t('footer.theme') }}
          </h3>
          <div class="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 shadow-sm">
            <DarkModeToggle />
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-gray-200/20 dark:border-gray-700/20">
        <p class="text-center text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} 
          <span class="font-medium text-blue-600 dark:text-blue-400">
            {{ $t('typingTest.title') }}
          </span>
          . {{ $t('footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Components are auto-imported
</script>