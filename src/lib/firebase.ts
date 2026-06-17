import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// In AI Studio, we should generally prefer the injected config, 
// but the user provided a specific config block to use.
const firebaseConfig = {
  apiKey: "AIzaSyBz75FaCBsbCSWQOOyJctmU3qCaF94nHO0",
  authDomain: "nell-project-42d13.firebaseapp.com",
  projectId: "nell-project-42d13",
  storageBucket: "nell-project-42d13.firebasestorage.app",
  messagingSenderId: "123526564003",
  appId: "1:123526564003:web:2eb23e2511ccb86009d716",
  measurementId: "G-VWMW9V5T3Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { serverTimestamp };
