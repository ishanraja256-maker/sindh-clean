// Clean Sindh Firebase Web SDK initialization.
// Firebase web config is public client configuration; protect data with Firebase Security Rules.
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyDrQJNCeKsPxw0XYbZO38FBQGB8Wzw9fn4',
  authDomain: 'cleansindh-95a09.firebaseapp.com',
  databaseURL: 'https://cleansindh-95a09-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cleansindh-95a09',
  storageBucket: 'cleansindh-95a09.firebasestorage.app',
  messagingSenderId: '368429805726',
  appId: '1:368429805726:web:c9b6f4727f34c2c8150b8f'
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const realtimeDb = getDatabase(firebaseApp);
export const isFirebaseConfigured = true;
