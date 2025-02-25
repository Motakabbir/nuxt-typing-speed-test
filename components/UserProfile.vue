<template>
  <div class="max-w-4xl mx-auto">
    <!-- Profile Header -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {{ userInitials }}
            </span>
          </div>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ user?.email }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t('profile.memberSince', { date: memberSince }) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{{ $t(stat.label) }}</h3>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Recent Tests -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t('profile.recentTests') }}
      </h3>
      <div v-if="recentTests.length === 0" class="text-gray-500 dark:text-gray-400 text-center py-4">
        {{ $t('profile.noTests') }}
      </div>
      <div v-else class="space-y-4">
        <div v-for="test in recentTests" :key="test.id" 
             class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div class="font-medium text-gray-900 dark:text-white">{{ test.wpm }} WPM</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ test.accuracy }}% {{ $t('common.accuracy') }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-900 dark:text-white">
              {{ localeNames[test.language] }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(test.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preferences -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ $t('profile.preferences') }}
      </h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-gray-700 dark:text-gray-300">{{ $t('profile.testDuration') }}</label>
          <select v-model="preferences.testDuration" 
                  class="rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
            <option v-for="duration in [30, 60, 120, 300]" :key="duration" :value="duration">
              {{ duration }} {{ $t('common.seconds') }}
            </option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-700 dark:text-gray-300">
            {{ $t('profile.instantFeedback') }}
          </label>
          <toggle-switch v-model="preferences.showInstantFeedback" />
        </div>
        <div class="flex items-center justify-between">
          <label class="text-gray-700 dark:text-gray-300">
            {{ $t('profile.soundEnabled') }}
          </label>
          <toggle-switch v-model="preferences.soundEnabled" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useAppStore } from '@/store/app'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'

const { user } = useAuth()
const { $firestore } = useNuxtApp()
const appStore = useAppStore()
const { locale, locales } = useI18n()

const userInitials = computed(() => {
  const email = user.value?.email || ''
  return email.substring(0, 2).toUpperCase()
})

const memberSince = computed(() => {
  return new Intl.DateTimeFormat(locale.value).format(user.value?.metadata.creationTime || new Date())
})

const preferences = computed({
  get: () => appStore.preferences,
  set: (value) => appStore.updatePreferences(value)
})

const localeNames = computed(() => {
  return Object.fromEntries(
    locales.value.map(l => [l.code, l.name])
  )
})

const recentTests = ref([])
const stats = ref([
  { label: 'profile.stats.testsCompleted', value: 0 },
  { label: 'profile.stats.averageWpm', value: 0 },
  { label: 'profile.stats.bestWpm', value: 0 }
])

const formatDate = (timestamp: any) => {
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(timestamp.toDate())
}

const loadUserStats = async () => {
  if (!user.value) return

  const testRef = collection($firestore, 'typing-results')
  const userTests = query(
    testRef,
    where('userId', '==', user.value.uid),
    orderBy('timestamp', 'desc'),
    limit(5)
  )

  try {
    const snapshot = await getDocs(userTests)
    recentTests.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Calculate stats
    if (recentTests.value.length > 0) {
      const allWpms = recentTests.value.map(test => test.wpm)
      stats.value = [
        { label: 'profile.stats.testsCompleted', value: recentTests.value.length },
        { 
          label: 'profile.stats.averageWpm',
          value: Math.round(allWpms.reduce((a, b) => a + b, 0) / allWpms.length)
        },
        { label: 'profile.stats.bestWpm', value: Math.max(...allWpms) }
      ]
    }
  } catch (error) {
    console.error('Error loading user stats:', error)
  }
}

onMounted(() => {
  loadUserStats()
  appStore.loadPreferences()
})
</script>

<script>
// Toggle Switch Component
const ToggleSwitch = {
  props: {
    modelValue: Boolean
  },
  template: `
    <button
      @click="$emit('update:modelValue', !modelValue)"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
      :class="modelValue ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
      />
    </button>
  `
}
</script>