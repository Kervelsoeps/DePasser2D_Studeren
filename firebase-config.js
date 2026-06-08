// Importeer de benodigde Firebase functies via de officiële CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Jouw specifieke Firebase configuratie
const firebaseConfig = {
  apiKey: "AIzaSyBsJpE-YNoUwVBxg8YZcd54fIZV1-AMmqw",
  authDomain: "depasser2d.firebaseapp.com",
  projectId: "depasser2d",
  storageBucket: "depasser2d.firebasestorage.app",
  messagingSenderId: "282432178317",
  appId: "1:282432178317:web:343155ed2eb2e6ad2b3ac4",
  measurementId: "G-FS8SW0EWLL"
};

// Initialiseer Firebase en de Authenticatie service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Functie: Inloggen met Google Popup
window.loginWithGoogle = function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Succesvol ingelogd:", result.user);
        })
        .catch((error) => {
            console.error("Inlogfout:", error.message);
            alert("Inloggen mislukt: " + error.message);
        });
}

// Functie: Uitloggen
window.logout = function() {
    signOut(auth).then(() => {
        console.log("Succesvol uitgelogd");
    });
}

// Monitor of de gebruiker wel of niet is ingelogd
onAuthStateChanged(auth, (user) => {
    const loginScreen = document.getElementById("login-screen");
    const mainDashboard = document.getElementById("dashboard-content");
    const userDisplay = document.getElementById("user-display");

    if (user) {
        // Gebruiker IS ingelogd: Verberg loginscherm, toon de games
        if(loginScreen) loginScreen.style.display = "none";
        if(mainDashboard) mainDashboard.style.display = "block";
        if(userDisplay) userDisplay.innerText = `👋 Welkom, ${user.displayName}`;
    } else {
        // Gebruiker IS NIET ingelogd: Toon loginscherm, verberg de games
        if(loginScreen) loginScreen.style.display = "flex";
        if(mainDashboard) mainDashboard.style.display = "none";
    }
});
