<template>
  <div class="leaderboard-container">
    <h2 class="text-2xl font-bold mb-4">Leaderboard</h2>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="py-2 px-4 border-b">Rank</th>
          <th class="py-2 px-4 border-b">Username</th>
          <th class="py-2 px-4 border-b">WPM</th>
          <th class="py-2 px-4 border-b">Accuracy</th>
          <th class="py-2 px-4 border-b">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in scores" :key="score.id">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="py-2 px-4 border-b">{{ score.username }}</td>
          <td class="py-2 px-4 border-b">{{ score.wpm }}</td>
          <td class="py-2 px-4 border-b">{{ score.accuracy }}%</td>
          <td class="py-2 px-4 border-b">{{ new Date(score.date).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'pinia';
import { useLeaderboardStore } from '@/store/index';

export default defineComponent({
  setup() {
    const store = useStore();
    const leaderboardStore = useLeaderboardStore();
    
    return {
      scores: leaderboardStore.scores,
    };
  },
});
</script>

<style scoped>
.leaderboard-container {
  padding: 20px;
}
</style>