// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCIZmSGZVMMG7jO-MAG9vJvAFZofx0Tq7E',
  authDomain: 'piralarm-df5d9.firebaseapp.com',
  projectId: 'piralarm-df5d9',
  storageBucket: 'piralarm-df5d9.appspot.com',
  messagingSenderId: '1015003732269',
  appId: '1:1015003732269:web:c58710feeb4d5d6b479ba4'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const fs = getFirestore(app)
export const db = getDatabase(app)
