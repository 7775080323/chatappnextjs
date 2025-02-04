// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMAtUJfrLoUxPBfRktWCOxaPEgtImosrw",
  authDomain: "chatapplication-45895.firebaseapp.com",
  projectId: "chatapplication-45895",
  storageBucket: "chatapplication-45895.firebasestorage.app",
  messagingSenderId: "742305169109",
  appId: "1:742305169109:web:497cb43ac6a6aa6f7e2c5c",
  measurementId: "G-QNSDNJ77RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);