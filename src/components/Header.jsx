import React from 'react'
import { auth } from "../main.jsx";
import { useState,useEffect } from "react";
import { Link,useNavigate  } from "react-router-dom";



const Header = () => {
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
    <header className="text-gray-600 body-font bg-orange-200">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">kinntai</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

            <Link to="/Kintai" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> 勤怠ページ</Link>
            <Link to="/Top" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Topページ</Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={onLogout}>
          ログアウト
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header