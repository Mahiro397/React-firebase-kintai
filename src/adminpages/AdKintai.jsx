import React from 'react';
import { auth, provider } from '../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from 'firebase/auth';

import KintaiTable from '../admincomponents/KintaiTable.jsx';
import AdminHeader from '../admincomponents/AdminHeader.jsx';

const AdKintai = () => {
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
      } else {
        // 許可されていない場合、サインアウト
        signOut(auth);
        navigate('/');
      }
    }
  }, [user, navigate]);
  return (
    <>
      <AdminHeader></AdminHeader>
      <KintaiTable></KintaiTable>
    </>
  );
};

export default AdKintai;
