import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID
  }

  // Check if required config is present
  const requiredConfig = ['apiKey', 'authDomain', 'projectId']
  const missingConfig = requiredConfig.filter(key => !firebaseConfig[key])
  
  if (missingConfig.length > 0) {
    console.error(`Missing required Firebase configuration: ${missingConfig.join(', ')}`)
    throw new Error('Firebase configuration is incomplete')
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)

  return {
    provide: {
      auth,
      firestore
    }
  }
})