export const useDarkMode = () => {
    const darkMode = useState('darkMode', () => false)
  
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
      if (process.client) {
        localStorage.setItem('darkMode', String(darkMode.value))
      }
    }
  
    onMounted(() => {
      if (process.client) {
        const stored = localStorage.getItem('darkMode')
        if (stored) {
          darkMode.value = stored === 'true'
        } else {
          darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
      }
    })
  
    return darkMode
  }