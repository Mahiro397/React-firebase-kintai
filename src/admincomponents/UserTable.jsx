import React from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db, query, where } from '../main.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Firestoreクエリに条件を追加して、authフィールドがログイン中のUIDと一致するデータを取得
    const usersCollectionRef = collection(db, 'users');

    // データベースのクエリのスナップショットが変更されるたびに実行される関数
    const unsubscribe = onSnapshot(usersCollectionRef, (querySnapshot) => {
      // スナップショット内の各ドキュメントに対してマップ関数で展開
      const usersData = querySnapshot.docs.map((doc) => {
        // ドキュメントからデータを取得
        const data = doc.data();
        // 必要なデータを取り出して新しいオブジェクトに変換して返す
        return {
          id: doc.id,
          email: data.email,
          name: data.name,
        };
      });
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              名前
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index}{' '}
              </td>
              <td className="px-6 py-4">{data.id}</td>
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{data.name}</td>
              <td className="px-6 py-4 text-right">削除</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
