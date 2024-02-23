import React, { useState, useEffect } from 'react';
import { auth } from '../main.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const { name, email } = user;
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); // ログアウト成功時にHomeページに遷移
    } catch (error) {
      console.error('ログアウトエラー:', error.message);
    }
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
      navigate('/');
    }
  }, [navigate]);

  return (
    <button
      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      onClick={onLogout}
    >
      ログアウト
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  );
};

export default Logout;
