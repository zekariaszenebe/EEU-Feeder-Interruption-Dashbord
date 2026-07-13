import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxRSSu5q058ln65QO-q0UOi0BHG9XpXF0",
  authDomain: "proven-chain-7txfk.firebaseapp.com",
  projectId: "proven-chain-7txfk",
  storageBucket: "proven-chain-7txfk.firebasestorage.app",
  messagingSenderId: "1079221705731",
  appId: "1:1079221705731:web:71e32eb697c0d96f270236"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID from config
export const db = getFirestore(app, "ai-studio-d19b31fb-3861-4cc0-933d-23f035c442da");

// Validate Connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase Firestore connected successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or network status.", error);
    }
  }
}
testConnection();
