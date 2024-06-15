// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9haIVtMjnMZHe6fUstfoas5-ylY18Z7Y",
  authDomain: "netflix-clone-app-d1576.firebaseapp.com",
  projectId: "netflix-clone-app-d1576",
  storageBucket: "netflix-clone-app-d1576.appspot.com",
  messagingSenderId: "501647972392",
  appId: "1:501647972392:web:b4bac80288626b1b997d1d",
  measurementId: "G-DRX48MV541"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)