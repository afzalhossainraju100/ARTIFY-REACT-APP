// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKsB8rquIOPH9ZZdtS3phEWop7ge1vN2k",
  authDomain: "artify-af9c3.firebaseapp.com",
  projectId: "artify-af9c3",
  storageBucket: "artify-af9c3.firebasestorage.app",
  messagingSenderId: "443223495718",
  appId: "1:443223495718:web:a448c20df0123a738582e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
