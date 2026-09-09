import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const unsub = onSnapshot(collection(db, 'interruptions'), (snap) => {
  console.log('Snapshot size:', snap.size);
  snap.forEach(d => console.log(d.id, d.data().feederName, d.data().status));
  process.exit(0);
}, (err) => {
  console.error('Snapshot error:', err.message);
  process.exit(1);
});
setTimeout(() => { console.log('Timeout'); process.exit(1); }, 5000);
