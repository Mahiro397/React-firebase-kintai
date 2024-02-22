import React from 'react';
import { auth, provider } from '../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from 'firebase/auth';

const AdLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // コンポーネントがマウントされた時にユーザーの認証状態を確認
    if (user) {
      // 許可されたメールアドレスのリスト
      const allowedEmails = ['reactfirebasekintai@gmail.com'];
      // ログインされたユーザーが許可されたメールアドレスかどうか確認
      if (allowedEmails.includes(user.email)) {
        // 許可された場合、AdminTopページにリダイレクト
        navigate('/AdminTop');
      } else {
        // 許可されていない場合、サインアウト
        signOut(auth);
        navigate('/');
      }
    }
  }, [user, navigate]);

  const googelLogin = async (e) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const allowedEmails = ['reactfirebasekintai@gmail.com'];
      if (!allowedEmails.includes(user.email)) {
        throw new Error('ログインが許可されていません。');
      }
      navigate('/AdminTop');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
        <div className="text-center">
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
            管理者ページ
          </h1>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500"></p>
          <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-20">
            <div className="mt-3 rounded-lg sm:mt-0">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                onClick={googelLogin}
                className="block px-5 py-4 text-base font-medium text-center text-white  bg-blue-600 lg:px-10 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ログインする
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdLogin;
