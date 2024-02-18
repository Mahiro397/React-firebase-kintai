import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZ3ad1U4OGBV2PsGM2AZHU5bh5vX5_6HU",
    authDomain: "react-firebase-kintai.firebaseapp.com",
    databaseURL: "https://react-firebase-kintai-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-firebase-kintai",
    storageBucket: "react-firebase-kintai.appspot.com",
    messagingSenderId: "888004611059",
    appId: "1:888004611059:web:4f53ea900ab9f5de252086"
  };
  
    
    const app = initializeApp(firebaseConfig);
    //const auth = getAuth(app);
    const db = getFirestore(app);
    
    export const auth = getAuth();

    export default db;