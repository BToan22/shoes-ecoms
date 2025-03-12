// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsBeEXZLvXLTtN3bTM2K_LgNxqJ-xOTds",
    authDomain: "shoes-ecoms.firebaseapp.com",
    projectId: "shoes-ecoms",
    storageBucket: "shoes-ecoms.firebasestorage.app",
    messagingSenderId: "19150285291",
    appId: "1:19150285291:web:aa2dc907690459ce7a11ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
};
