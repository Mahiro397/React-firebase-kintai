import React from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../main.jsx';
import { useState, useEffect } from 'react';
import ModalButton from './ModalButton.jsx';

const Maintable = () => {
  const [kintai, setKintai] = useState([]);

  useEffect(() => {
    const kinntaiCollectionRef = collection(db, 'attendance');
    const unsubscribe = onSnapshot(kinntaiCollectionRef, (querySnapshot) => {
      const kintaiData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
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
  }, []);

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
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {kintai.map((data, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.date}{' '}
                {/* 例えば、データの中に "date" プロパティがあると仮定 */}
              </td>
              <td className="px-6 py-4">{data.startTime}</td>
              <td className="px-6 py-4">{data.endTime}</td>
              <td className="px-6 py-4">{data.overtime}</td>
              <td className="px-6 py-4 text-right">
                <ModalButton></ModalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintable;
