import { initializeApp } from "firebase/app"
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBjQTJ1c85OMDEiDHTC1wtDlGXSFK80Sy8",
  authDomain: "tickets-ca401.firebaseapp.com",
  databaseURL: "https://tickets-ca401-default-rtdb.firebaseio.com",
  projectId: "tickets-ca401",
  storageBucket: "tickets-ca401.appspot.com",
  messagingSenderId: "107880264548",
  appId: "1:107880264548:web:30139a9b5c5d7c398d0071"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const database = getDatabase(app)
export const storage = getStorage(app)