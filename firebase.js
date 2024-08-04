// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNtxth03KuYfuQyZLnE8XpQ613iZ78aTY",
  authDomain: "inventory-management-87790.firebaseapp.com",
  projectId: "inventory-management-87790",
  storageBucket: "inventory-management-87790.appspot.com",
  messagingSenderId: "342750789722",
  appId: "1:342750789722:web:6b7d6583af46fafc441863",
  measurementId: "G-ZFW7HX5402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };