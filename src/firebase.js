import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCxzfXjZ9sler6PCFVwGP2m-BTq4xsIUWw",
    authDomain: "cook-book-react.firebaseapp.com",
    projectId: "cook-book-react",
    storageBucket: "cook-book-react.appspot.com",
    messagingSenderId: "1084918474918",
    appId: "1:1084918474918:web:eb35fdd7e06654e2adec67",
    measurementId: "G-SF7VHK8TGF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
