import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1uVQe22Y79RhSi80iScsDKg4iGA3Waoo",
  authDomain: "collegetify-app.firebaseapp.com",
  projectId: "collegetify-app",
  storageBucket: "collegetify-app.appspot.com",
  messagingSenderId: "175329820677",
  appId: "1:175329820677:web:b414d83a7746f2706edc6c",
  measurementId: "G-V6B1FDWF30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
