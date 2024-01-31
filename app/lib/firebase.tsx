// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDAJpFMcdy9Lt8mDQAGod6t8U-8ew3T3i4",
	authDomain: "ichalobantu-a5b61.firebaseapp.com",
	projectId: "ichalobantu-a5b61",
	storageBucket: "ichalobantu-a5b61.appspot.com",
	messagingSenderId: "305943229299",
	appId: "1:305943229299:web:f74c9ad492b36de93dcb06",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
