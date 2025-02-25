<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        {{ $t('leaderboard') }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('leaderboardDescription', 'Top performers from around the world') }}</p>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">{{ $t('rank') }}</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">{{ $t('username') }}</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">{{ $t('wpm') }}</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">{{ $t('accuracy') }}</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">{{ $t('date') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(score, index) in leaderboard" 
                :key="score.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <span v-if="index < 3" class="mr-2">
                    <span v-if="index === 0" class="text-yellow-400">🥇</span>
                    <span v-else-if="index === 1" class="text-gray-400">🥈</span>
                    <span v-else class="text-amber-600">🥉</span>
                  </span>
                  <span class="text-gray-900 dark:text-gray-100">{{ index + 1 }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-900 dark:text-gray-100">{{ score.username }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  {{ score.wpm }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium',
                  score.accuracy >= 98 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                  score.accuracy >= 95 ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                ]">
                  {{ score.accuracy }}%
                </span>
              </td>
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400">
                {{ new Date(score.date).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTypingTestStore } from '@/store/index';

const store = useTypingTestStore();
const leaderboard = computed(() => store.leaderboard);
</script>