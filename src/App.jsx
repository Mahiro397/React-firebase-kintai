import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Kintai from './pages/Kintai';
import Top from './pages/Top';
import Signup from './pages/Signup';

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Top" element={<Top />} />
        <Route path="/kintai" element={<Kintai/>} />
      </Routes>
    </>
  )
}

export default App
