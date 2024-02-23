import React from 'react';
import AdminHeader from '../admincomponents/AdminHeader';
import UserTable from '../admincomponents/UserTable';
import { auth, provider } from '../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from 'firebase/auth';

const AdminTop = () => {
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
      } else {
        // 許可されていない場合、サインアウト
        signOut(auth);
        navigate('/AdLogin');
      }
    }
  }, [user, navigate]);
  return (
    <>
      <AdminHeader></AdminHeader>
      <p>アドミン</p>
      <UserTable />
    </>
  );
};

export default AdminTop;
