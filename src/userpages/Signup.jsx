import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../main.jsx';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: userCredential.user.displayName,
          email: userCredential.user.email,
        });
        console.log(setDoc);
      }

      navigate('/Kintai');
      console.log('サインアップにせいこうしました');
    } catch (error) {
      //console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        //console.log('ログインしています');
        navigate('/Kintai');
      } else {
        // ユーザーがログインしていない場合の処理
        console.log('ログインしていません');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">サインアップ</h1>

          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              id="name"
              value={name}
              placeholder="Full Name"
              required
              onChange={onChange}
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              required
              onChange={onChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              value={password}
              onChange={onChange}
              required
              id="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              アカウントを作成
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6 text-primary-600 dark:text-primary-500">
          既にアカウントをもっていますか?{' '}
          <Link
            to="/Login"
            className="no-underline border-b border-blue text-blue"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
