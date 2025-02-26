const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore')
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const languages = ['en', 'es', 'fr']
const usernames = ['SpeedTyper', 'TypeMaster', 'KeyboardNinja', 'WordSmith', 'TypingPro']

async function generateTestData() {
  try {
    // First sign in as an admin
    const email = process.env.FIREBASE_ADMIN_EMAIL
    const password = process.env.FIREBASE_ADMIN_PASSWORD
    
    if (!email || !password) {
      throw new Error('FIREBASE_ADMIN_EMAIL and FIREBASE_ADMIN_PASSWORD must be set in .env')
    }

    await signInWithEmailAndPassword(auth, email, password)
    console.log('Successfully authenticated')

    const testData = []
    
    for (let i = 0; i < 100; i++) {
      // Generate random but realistic data
      const wpm = Math.floor(Math.random() * (150 - 30) + 30) // WPM between 30-150
      const accuracy = Math.floor(Math.random() * (100 - 85) + 85) // Accuracy between 85-100%
      const language = languages[Math.floor(Math.random() * languages.length)]
      const username = `${usernames[Math.floor(Math.random() * usernames.length)]}${Math.floor(Math.random() * 1000)}`
      
      // Create timestamp within last 30 days
      const now = new Date()
      const timestamp = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      
      const entry = {
        userId: `test-user-${Math.floor(Math.random() * 1000)}`,
        username,
        wpm,
        accuracy,
        language,
        timestamp: Timestamp.fromDate(timestamp)
      }
      
      testData.push(entry)
    }
    
    // Add data to Firestore
    const leaderboardRef = collection(db, 'typing-results')
    
    for (const entry of testData) {
      try {
        await addDoc(leaderboardRef, entry)
        console.log(`Added entry for ${entry.username} with ${entry.wpm} WPM`)
      } catch (error) {
        console.error('Error adding entry:', error)
      }
    }
    
    console.log('Finished adding test data')
  } catch (error) {
    console.error('Failed to generate test data:', error)
  }
}

// Run the function
generateTestData().catch(console.error)