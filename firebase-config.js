
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCYB9XF0cihp_9Kp_tvq9L9SDajv15tuSg",
    authDomain: "d-alert-app-827dd.firebaseapp.com",
    projectId: "d-alert-app-827dd",
    storageBucket: "d-alert-app-827dd.appspot.com",
    messagingSenderId: "174354462163",
    appId: "1:174354462163:web:28fa0da330be0f9de4eb26",
    measurementId: "G-HC44GJFPJ1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth  = getAuth(app)

export default app;
