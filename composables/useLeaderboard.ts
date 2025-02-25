import { ref, computed } from 'vue'
import { collection, query, orderBy, limit, getDocs, where, Timestamp } from 'firebase/firestore'
import type { QueryDocumentSnapshot } from 'firebase/firestore'

interface LeaderboardEntry {
  id: string
  userId: string
  username: string
  wpm: number
  accuracy: number
  language: string
  timestamp: Date
}

export const useLeaderboard = () => {
  const { $firestore } = useNuxtApp()
  const entries = ref<LeaderboardEntry[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const timeFilter = ref<'all' | 'today' | 'week' | 'month'>('all')
  const languageFilter = ref<string | null>(null)

  const filteredEntries = computed(() => {
    let filtered = [...entries.value]
    
    if (languageFilter.value) {
      filtered = filtered.filter(entry => entry.language === languageFilter.value)
    }
    
    return filtered.sort((a, b) => b.wpm - a.wpm)
  })

  const fetchLeaderboard = async () => {
    loading.value = true
    error.value = null
    
    try {
      const leaderboardRef = collection($firestore, 'typing-results')
      let q = query(leaderboardRef, orderBy('wpm', 'desc'), limit(100))

      // Apply time filter
      if (timeFilter.value !== 'all') {
        const now = new Date()
        let startDate = new Date()

        switch (timeFilter.value) {
          case 'today':
            startDate.setHours(0, 0, 0, 0)
            break
          case 'week':
            startDate.setDate(now.getDate() - 7)
            break
          case 'month':
            startDate.setMonth(now.getMonth() - 1)
            break
        }

        q = query(q, where('timestamp', '>=', Timestamp.fromDate(startDate)))
      }

      const querySnapshot = await getDocs(q)
      entries.value = querySnapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const data = doc.data()
        return {
          id: doc.id,
          userId: data.userId,
          username: data.username || 'Anonymous',
          wpm: data.wpm,
          accuracy: data.accuracy,
          language: data.language,
          timestamp: data.timestamp.toDate()
        }
      })
    } catch (e: any) {
      error.value = e.message
      console.error('Error fetching leaderboard:', e)
    } finally {
      loading.value = false
    }
  }

  const setTimeFilter = (filter: 'all' | 'today' | 'week' | 'month') => {
    timeFilter.value = filter
    fetchLeaderboard()
  }

  const setLanguageFilter = (lang: string | null) => {
    languageFilter.value = lang
    fetchLeaderboard()
  }

  // Initial fetch
  fetchLeaderboard()

  return {
    entries: filteredEntries,
    loading,
    error,
    timeFilter,
    languageFilter,
    setTimeFilter,
    setLanguageFilter,
    fetchLeaderboard
  }
}