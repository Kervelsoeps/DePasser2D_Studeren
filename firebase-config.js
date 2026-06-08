// Importeer Firebase modules via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, limit, onSnapshot, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuratie
const firebaseConfig = {
  apiKey: "AIzaSyBsJpE-YNoUwVBxg8YZcd54fIZV1-AMmqw",
  authDomain: "depasser2d.firebaseapp.com",
  projectId: "depasser2d",
  storageBucket: "depasser2d.firebasestorage.app",
  messagingSenderId: "282432178317",
  appId: "1:282432178317:web:343155ed2eb2e6ad2b3ac4",
  measurementId: "G-FS8SW0EWLL"
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// Google Login & Logout
window.loginWithGoogle = () => signInWithPopup(auth, provider).catch(err => console.error(err));
window.logout = () => signOut(auth).catch(err => console.error(err));

// GLOBALE FUNCTIE: Score opslaan en optellen in de Cloud
window.saveScoreToCloud = async (points) => {
    if (!currentUser) return;
    
    const userDocRef = doc(db, "leaderboard", currentUser.uid);
    try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            // Als de gebruiker al bestaat, tel de punten op bij de totalScore
            await updateDoc(userDocRef, {
                totalScore: increment(points)
            });
        } else {
            // Als het de eerste keer is, maak het document aan
            await setDoc(userDocRef, {
                name: currentUser.displayName || "Anonieme Passer",
                totalScore: points
            });
        }
    } catch (error) {
        console.error("Fout bij het updaten van de score:", error);
    }
};

// Auth State Monitor & Leaderboard Live Update
onAuthStateChanged(auth, (user) => {
    const loginScreen = document.getElementById("login-screen");
    const mainDashboard = document.getElementById("dashboard-content");
    const userDisplay = document.getElementById("user-display");

    currentUser = user;

    if (user) {
        if(loginScreen) loginScreen.style.display = "none";
        if(mainDashboard) mainDashboard.style.display = "block";
        if(userDisplay) userDisplay.innerText = `👋 ${user.displayName}`;
        
        // Laad live het leaderboard (als het element aanwezig is op de pagina)
        const boardElem = document.getElementById("leaderboard-list");
        if (boardElem) {
            const q = query(collection(db, "leaderboard"), orderBy("totalScore", "desc"), limit(10));
            onSnapshot(q, (snapshot) => {
                boardElem.innerHTML = "";
                let rank = 1;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const li = document.createElement("div");
                    li.className = "leaderboard-item";
                    li.style.display = "flex";
                    li.style.justifyContent = "space-between";
                    li.style.padding = "8px 0";
                    li.style.borderBottom = "1px solid #2a2a4a";
                    
                    li.innerHTML = `<span>#${rank} ${data.name}</span> <strong>${data.totalScore} pts</strong>`;
                    if(rank === 1) li.style.color = "var(--neon-yellow)"; // Goud voor nummer 1!
                    boardElem.appendChild(li);
                    rank++;
                });
            });
        }
    } else {
        if(loginScreen) loginScreen.style.display = "flex";
        if(mainDashboard) mainDashboard.style.display = "none";
    }
});
