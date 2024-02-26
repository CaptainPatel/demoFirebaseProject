// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const apiKey = `${import.meta.env.VITE_APIKEY}`;
const authDomain = `${import.meta.env.VITE_AUTH_DOMAIN}`;
const projectId = `${import.meta.env.VITE_PROJECT_ID}`;
const storageBucket = `${import.meta.env.VITE_STORAGE_BUCKET}`;
const messagingSenderId = `${import.meta.env.VITE_MESSAGING_SENDER_ID}`;
const appId = `${import.meta.env.VITE_APP_ID}`;
const measurementId = `${import.meta.env.VITE_MEASUREMENT_ID}`;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);