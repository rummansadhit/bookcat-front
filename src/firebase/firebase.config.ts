// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCspR0VSYnAaBI0NYIn__NsdmuSHgVt5sA",
  authDomain: "bookcatalog-ea9f7.firebaseapp.com",
  projectId: "bookcatalog-ea9f7",
  storageBucket: "bookcatalog-ea9f7.appspot.com",
  messagingSenderId: "435829050690",
  appId: "1:435829050690:web:9da72849daf9c222454cdb",
  measurementId: "G-5SYEXW180F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;