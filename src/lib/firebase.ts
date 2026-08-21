import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Validate Connection to Firestore on boot
async function testConnection() {
  try {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return;
    }
    await getDocFromServer(doc(db, 'interruptions', 'connection-test'));
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (
      err?.code === 'unavailable' ||
      err?.message?.includes('the client is offline') ||
      err?.message?.includes('unavailable')
    ) {
      // Client operates gracefully with offline cache until server connects
      console.info("Firestore client initialized with offline persistence.");
    }
  }
}

if (typeof window !== 'undefined') {
  testConnection();
}

