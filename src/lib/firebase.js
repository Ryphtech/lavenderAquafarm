import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBddvzf1FNvVfolODxVDH3ck1770nnG8RE",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lavenderaquafarm.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lavenderaquafarm",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lavenderaquafarm.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "322929664285",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:322929664285:web:3bd18a2db7d51f0e1341f4",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FWHGTERL6D"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (only supported in browser environments)
let analytics = null;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch(() => {});
}

export { analytics };

