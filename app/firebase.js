// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, FacebookAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGuiVVLUBiB8cfJ5OraNASwkoqaPQoqQw",
  authDomain: "nextjs-auth-a069b.firebaseapp.com",
  projectId: "nextjs-auth-a069b",
  storageBucket: "nextjs-auth-a069b.appspot.com",
  messagingSenderId: "881098934874",
  appId: "1:881098934874:web:a51c625fe1b7cbfe636663"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);