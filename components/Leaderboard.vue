<template>
  <div class="w-full">
    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-6">
      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('leaderboard.filters.timeRange') }}
        </label>
        <select
          v-model="timeFilter"
          class="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">{{ $t('leaderboard.filters.all') }}</option>
          <option value="today">{{ $t('leaderboard.filters.today') }}</option>
          <option value="week">{{ $t('leaderboard.filters.week') }}</option>
          <option value="month">{{ $t('leaderboard.filters.month') }}</option>
        </select>
      </div>

      <div class="flex-1 min-w-[200px]">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('leaderboard.language') }}
        </label>
        <select
          v-model="languageFilter"
          class="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option :value="null">{{ $t('leaderboard.filters.allLanguages') }}</option>
          <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
            {{ locale.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg">
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="entries.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">{{ $t('leaderboard.noEntries') }}</p>
    </div>

    <!-- Leaderboard Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="th-cell w-16">#</th>
            <th scope="col" class="th-cell">{{ $t('leaderboard.user') }}</th>
            <th scope="col" class="th-cell text-right">{{ $t('leaderboard.wpm') }}</th>
            <th scope="col" class="th-cell text-right">{{ $t('leaderboard.accuracy') }}</th>
            <th scope="col" class="th-cell">{{ $t('leaderboard.language') }}</th>
            <th scope="col" class="th-cell">{{ $t('leaderboard.date') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          <tr v-for="(entry, index) in entries" :key="entry.id" 
              :class="{ 'bg-blue-50 dark:bg-blue-900/20': entry.userId === currentUserId }">
            <td class="td-cell font-medium">{{ index + 1 }}</td>
            <td class="td-cell font-medium">{{ entry.username }}</td>
            <td class="td-cell text-right">{{ entry.wpm }}</td>
            <td class="td-cell text-right">{{ entry.accuracy }}%</td>
            <td class="td-cell">{{ localeNames[entry.language] || entry.language }}</td>
            <td class="td-cell">{{ formatDate(entry.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLeaderboard } from '@/composables/useLeaderboard'
import { useAuth } from '@/composables/useAuth'

const { locale, locales } = useI18n()
const { user } = useAuth()
const currentUserId = computed(() => user.value?.uid)

const {
  entries,
  loading,
  error,
  timeFilter,
  languageFilter,
  setTimeFilter,
  setLanguageFilter
} = useLeaderboard()

// Available locales for filtering
const availableLocales = computed(() => locales.value.map(l => ({
  code: l.code,
  name: l.name
})))

// Mapping of locale codes to names
const localeNames = computed(() => {
  return Object.fromEntries(
    locales.value.map(l => [l.code, l.name])
  )
})

// Format date based on current locale
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

// Watch filters and reload data
watch([timeFilter, languageFilter], () => {
  setTimeFilter(timeFilter.value)
  setLanguageFilter(languageFilter.value)
})
</script>

<style scoped>
.th-cell {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider;
}

.td-cell {
  @apply px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap;
}
</style>