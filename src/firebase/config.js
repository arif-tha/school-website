import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcQ_fTolffafZdv-B0XXLWQGHegMV3WHI",
  authDomain: "crest-school.firebaseapp.com",
  projectId: "crest-school",
  storageBucket: "crest-school.firebasestorage.app",
  messagingSenderId: "24630727558",
  appId: "1:24630727558:web:62242588b9da826962d207"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;