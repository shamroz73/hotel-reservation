import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD43sAOfzyF7_c4gkSet4w7XPVjVM6wsV8",
  authDomain: "nk-project-3311d.firebaseapp.com",
  projectId: "nk-project-3311d",
  storageBucket: "nk-project-3311d.firebasestorage.app",
  messagingSenderId: "10943898993",
  appId: "1:10943898993:web:72de36d2acd5c4be7782d0",
  measurementId: "G-V65JTNBJKW",
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }

