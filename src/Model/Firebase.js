// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAilAGjb0-LFpfwCbmEL1TF4y2b97AoijQ',
  authDomain: 'tfg-ual-2024.firebaseapp.com',
  projectId: 'tfg-ual-2024',
  storageBucket: 'tfg-ual-2024.appspot.com',
  messagingSenderId: '230570647913',
  appId: '1:230570647913:web:05b12897efe7db0e9e9df8',
  measurementId: 'G-TLT0BK682N',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export default firebaseApp
