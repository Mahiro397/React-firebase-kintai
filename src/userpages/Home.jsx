import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../main.jsx';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        //console.log('ログインしています');
        navigate('/Top');
      } else {
        // ユーザーがログインしていない場合の処理
        // console.log('ログインしていません');
      }
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, [navigate]);
  return (
    <section className="flex items-center justify-center min-h-screen bg-white">
      <Link to="/AdLogin">管理者ページ</Link>
      <div className="w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div className="text-center">
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
            勤怠管理アプリ
          </h1>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500"></p>
          <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-20">
            <div className="mt-3 rounded-lg sm:mt-0">
              <button className="block px-5 py-4 text-base font-medium text-center text-white  bg-blue-600 lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Link to="/Login">ログインする</Link>
              </button>
            </div>
            <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
              <button className="block px-5 lg:px-10 py-3.5 text-base font-medium text-center text-blue-600  border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <Link to="/Signup"> 新規作成</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
