// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from  'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPjRN8tAnjYvojtO_Rt8fWlbmIQydEKAM",
    authDomain: "form-cee2e.firebaseapp.com",
    databaseURL: "https://form-cee2e-default-rtdb.firebaseio.com",
    projectId: "form-cee2e",
    storageBucket: "form-cee2e.appspot.com",
    messagingSenderId: "900453703381",
    appId: "1:900453703381:web:8d84ea18bdd3bb49528c5c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);