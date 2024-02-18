import React from 'react'
import { Link } from "react-router-dom";
import { auth } from "../main.jsx";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Maintable from '../components/Maintable.jsx';
import Calendar from '../components/Calendar.jsx';
import ModalButton from '../components/ModalButton.jsx';
import Header from '../components/Header.jsx';

const Top = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

        const { name, email } = user;
        const navigate = useNavigate();

        const onLogout = () => {
            auth.signOut();
            navigate("/");
            };

            
       
        useEffect(() => {
          const currentUser = auth.currentUser;
          if (currentUser) {
            setUser({
              name: currentUser.displayName || '',
              email: currentUser.email || '',
            });
          } else {
            // ユーザーがログインしていない場合の処理
            navigate('/Login');
          }
        }, [navigate]);
      
  return (
    <>
    <Header></Header>
    
    
    <Maintable></Maintable>
   
    </>
    
  )
}

export default Top