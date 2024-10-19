// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBuGgh-dg9hGUe6-4NNl2DrtrDfrlthKXE",
  authDomain: "task81d-b1037.firebaseapp.com",
  projectId: "task81d-b1037",
  storageBucket: "task81d-b1037.appspot.com",
  messagingSenderId: "973115573463",
  appId: "1:973115573463:web:830435b78ecb01d16ddc92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };