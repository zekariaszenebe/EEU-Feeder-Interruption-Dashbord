import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function readDb() {
  try {
    const snap = await getDocs(collection(db, 'interruptions'));
    console.log('Total in DB:', snap.size);
    snap.forEach(d => console.log(d.id, d.data().feederName, d.data().status));
  } catch (e) {
    console.error('Error reading:', e.message);
  }
  process.exit();
}
readDb();
