import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Login from './userpages/Login';
import Home from './userpages/Home';
import Kintai from './userpages/Kintai';
import Top from './userpages/Top';
import Signup from './userpages/Signup';
import AdminTop from './adminpages/AdminTop';
import AdLogin from './adminpages/AdLogin';
import AdKintai from './adminpages/AdKintai';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Top" element={<Top />} />
        <Route path="/kintai" element={<Kintai />} />
        <Route path="/AdminTop" element={<AdminTop />} />
        <Route path="/AdLogin" element={<AdLogin />} />
        <Route path="/AdKintai" element={<AdKintai />} />
      </Routes>
    </>
  );
}

export default App;
