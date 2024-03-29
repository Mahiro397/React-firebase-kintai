import React from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db, query, where } from '../main.jsx';
import { useState, useEffect } from 'react';
import ModalButton from './ModalButton.jsx';
import { useNavigate } from 'react-router-dom';

const Maintable = () => {
  const [kintai, setKintai] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ログインしているユーザーがいるかどうかを確認
    const user = auth.currentUser;
    if (!user) {
      // ログインしていない場合はHomeページにリダイレクト
      navigate('/');
      return; // useEffectを早めに終了
    }

    // ログインしているユーザーのUIDを取得
    const userUid = user.uid;

    // Firestoreクエリに条件を追加して、authフィールドがログイン中のUIDと一致するデータを取得
    const kinntaiCollectionRef = collection(db, 'attendance');
    const q = query(kinntaiCollectionRef, where('auth', '==', userUid));

    // データベースのクエリのスナップショットが変更されるたびに実行される関数
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // スナップショット内の各ドキュメントに対してマップ関数で展開
      const kintaiData = querySnapshot.docs.map((doc) => {
        // ドキュメントからデータを取得
        const data = doc.data();

        // 必要なデータを取り出して新しいオブジェクトに変換して返す
        return {
          id: doc.id,
          date: new Date(data.clock_in_time).toLocaleDateString(),
          startTime: new Date(data.clock_in_time).toLocaleTimeString(),
          endTime: new Date(data.clock_out_time).toLocaleTimeString(),
          overtime: data.overtime,
        };
      });
      setKintai(kintaiData);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              日付
            </th>
            <th scope="col" className="px-6 py-3">
              出勤
            </th>
            <th scope="col" className="px-6 py-3">
              退勤
            </th>
            <th scope="col" className="px-6 py-3">
              残業時間
            </th>
          </tr>
        </thead>
        <tbody>
          {kintai.map((data) => (
            <tr
              key={data.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.date}
              </td>
              <td className="px-6 py-4">{data.startTime}</td>
              <td className="px-6 py-4">{data.endTime}</td>
              <td className="px-6 py-4">{data.overtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintable;
