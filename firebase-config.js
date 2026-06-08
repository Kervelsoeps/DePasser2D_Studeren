// Importeer Firebase modules via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, limit, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuratie
const firebaseConfig = {
  apiKey: "AIzaSyBsJpE-YNoUwVBxg8YZcd54fIZV1-AMmqw",
  authDomain: "depasser2d.firebaseapp.com",
  projectId: "depasser2d",
  storageBucket: "depasser2d.firebasestorage.app",
  messagingSenderId: "282432178317",
  appId: "1:282432178317:web:343155ed2eb2e6ad2b3ac4",
  measurementId: "G-FS8SW0EWLL"
