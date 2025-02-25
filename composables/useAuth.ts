import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { ref } from 'vue'

export const useAuth = () => {
  const { $auth } = useNuxtApp()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const loading = ref(true)

  // Only set up the auth listener if $auth is available
  if ($auth) {
    onAuthStateChanged($auth, (newUser) => {
      user.value = newUser
      isAuthenticated.value = !!newUser
      loading.value = false
    })
  } else {
    console.warn('Auth service not yet available')
    loading.value = false
  }

  const signIn = async (email: string, password: string) => {
    if (!$auth) throw new Error('Auth service not available')
    try {
      const userCredential = await signInWithEmailAndPassword($auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!$auth) throw new Error('Auth service not available')
    try {
      const userCredential = await createUserWithEmailAndPassword($auth, email, password)
      return { user: userCredential.user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message }
    }
  }

  const signOut = async () => {
    if (!$auth) throw new Error('Auth service not available')
    try {
      await firebaseSignOut($auth)
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signUp,
    signOut
  }
}