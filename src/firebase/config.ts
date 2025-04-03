import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsztsfRKONv0CJ4-gPJBed9zQbySPgiN4",
  authDomain: "ohw-solutions.firebaseapp.com",
  projectId: "ohw-solutions",
  storageBucket: "ohw-solutions.firebasestorage.app",
  messagingSenderId: "694043970150",
  appId: "1:694043970150:web:777b204df91534632c7ba7",
  measurementId: "G-ZX7Y1LJFLJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error('Analytics initialization error:', error);
  }
}
export { analytics };
