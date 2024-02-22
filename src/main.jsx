import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCZ3ad1U4OGBV2PsGM2AZHU5bh5vX5_6HU',
  authDomain: 'react-firebase-kintai.firebaseapp.com',
  databaseURL:
    'https://react-firebase-kintai-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-firebase-kintai',
  storageBucket: 'react-firebase-kintai.appspot.com',
  messagingSenderId: '888004611059',
  appId: '1:888004611059:web:4f53ea900ab9f5de252086',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, query, where, onSnapshot, provider, orderBy };
//export default db;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
