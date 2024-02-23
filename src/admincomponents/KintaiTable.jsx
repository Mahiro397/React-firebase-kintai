import React from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db, query, where, orderBy } from '../main.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import ModalButton from '../components/ModalButton.jsx';

const KintaiTable = () => {
  const [kintai, setKintai] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchMonth, setSearchMonth] = useState('月');
  const [userName, setUserName] = useState([]);
  const [totalOvertime, setTotalOvertime] = useState({ hours: 0, minutes: 0 });
  const [salary, setSalary] = useState('');
  const [overtimePay, setOvertimePay] = useState('');
  const [monthSalary, setMonthSalary] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Firestoreクエリに条件を追加して、authフィールドがログイン中のUIDと一致するデータを取得
    const usersCollectionRef = collection(db, 'users');

    // データベースのクエリのスナップショットが変更されるたびに実行される関数
    onSnapshot(usersCollectionRef, (querySnapshot) => {
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
      setUserName(usersData);
    });

    // Firestoreクエリに条件を追加して、authフィールドがログイン中のUIDと一致するデータを取得
    const kinntaiCollectionRef = collection(db, 'attendance');
    const q = query(kinntaiCollectionRef, orderBy('clock_in_time', 'desc'));

    // データベースのクエリのスナップショットが変更されるたびに実行される関数
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // スナップショット内の各ドキュメントに対してマップ関数で展開
      const kintaiData = querySnapshot.docs.map((doc) => {
        // ドキュメントからデータを取得
        const data = doc.data();
        // 必要なデータを取り出して新しいオブジェクトに変換して返す
        //console.log(doc.id);
        return {
          name: data.auth_name,
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

  const search = () => {
    const kinntaiCollectionRef = collection(db, 'attendance');
    const q = query(kinntaiCollectionRef, where('auth_name', '==', searchName));
    const searchMonthStart = `${searchMonth}-01T00:00:00`;
    const searchMonthEnd = `${searchMonth}-31T23:59:59`;

    const qq = query(
      q,
      where('clock_in_time', '>=', searchMonthStart),
      where('clock_in_time', '<=', searchMonthEnd)
    );

    // データベースのクエリのスナップショットが変更されるたびに実行される関数
    onSnapshot(qq, (querySnapshot) => {
      //時間と分を足すときに箱
      let totalOvertimeValue = { hours: 0, minutes: 0 };

      // スナップショット内の各ドキュメントに対してマップ関数で展開
      const kintaiData = querySnapshot.docs.map((doc) => {
        // ドキュメントからデータを取得
        const data = doc.data();

        const overtime = data.overtime || '0時間0分';
        //console.log(overtime);

        //文字を取り除いて配列に入れる
        const overtimeParts = overtime.split(/[時間分]/);
        //console.log(overtimeParts);

        //配列の0番目が時間
        const hours = parseInt(overtimeParts[0], 10);
        //console.log(hours);
        //配列の２番目が分
        const minutes = parseInt(overtimeParts[2], 10);
        //console.log(minutes);

        //時間の足し算
        totalOvertimeValue.hours += hours;
        //console.log(totalOvertimeValue);

        //分の足し算
        totalOvertimeValue.minutes += minutes;
        //console.log(totalOvertimeValue);

        // 必要なデータを取り出して新しいオブジェクトに変換して返す
        return {
          name: data.auth_name,
          id: doc.id,
          date: new Date(data.clock_in_time).toLocaleDateString(),
          startTime: new Date(data.clock_in_time).toLocaleTimeString(),
          endTime: new Date(data.clock_out_time).toLocaleTimeString(),
          overtime: data.overtime,
        };
      });

      //分を60割り、商を時間にたす
      totalOvertimeValue.hours += Math.floor(totalOvertimeValue.minutes / 60);
      //console.log(totalOvertimeValue);

      //分を60割り、余りを時間にたす
      totalOvertimeValue.minutes %= 60;
      //console.log(totalOvertimeValue);

      setKintai(kintaiData);
      setTotalOvertime(totalOvertimeValue);
      //console.log(totalOvertime);
    });
  };

  const inputChangeName = (e) => {
    const value = e.target.value;
    //console.log(value);
    setSearchName(value);
  };

  const inputChangeMonth = (e) => {
    const value = e.target.value;
    //console.log(value);
    setSearchMonth(value);
  };

  const inputChangeSalary = (e) => {
    const value = e.target.value;
    //console.log(value);
    setSalary(value);
  };

  useEffect(() => {
    const monthMoney = parseFloat(overtimePay) + parseFloat(salary);
    setMonthSalary(monthMoney);
  }, [overtimePay, salary]);

  //残業代の計算
  const overtimeCalculataion = (hours, minutes) => {
    //残業時間の時間の部分の単位をを分に変換。
    const minuteConversion = hours * 60;
    //変換した分と残業時間の分単位を足す
    const totalMinute = minutes + minuteConversion;
    //今月の基本給/月平均所定労働時間数 = 一時間の時給
    const hourSalary = salary / 160.6;
    //一時間の時給/60 = 1分の時給
    const minutesSalary = hourSalary / 60;
    //1分の時給*1.25(残業割増)*残業時間（分）
    const overtimeSalary = minutesSalary * 1.25 * totalMinute;
    setOvertimePay(Math.round(overtimeSalary));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex m-5">
        <select
          id="searchName"
          name="searchName"
          placeholder="絞り込みの名前"
          className="border rounded-md p-2 outline-none"
          onChange={inputChangeName}
        >
          <option hidden>社員名を選択してください</option>
          {userName.map((userData) => (
            <option key={userData.id} value={userData.name}>
              {userData.name}
            </option>
          ))}
        </select>
        <input
          id="searchMonth"
          name="searchMonth"
          type="month"
          className="border rounded-md p-2 outline-none"
          onChange={inputChangeMonth}
        />

        <button
          onClick={search}
          className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          絞り込み
        </button>
        <div className="ml-auto">
          月の基本給
          <input
            type="number"
            id="monthlySalary"
            name="monthlySalary"
            className="border rounded-md p-2 outline-none"
            onChange={inputChangeSalary}
          />
          <p>
            {searchMonth}の合計残業時間: {totalOvertime.hours}時間
            {totalOvertime.minutes}分
          </p>
          <p>残業代: {overtimePay}円</p>
          <p>月給: {monthSalary}円</p>
          <button
            onClick={() =>
              overtimeCalculataion(totalOvertime.hours, totalOvertime.minutes)
            }
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            計算
          </button>
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              名前
            </th>
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
          {kintai.map((data) => (
            <tr
              key={data.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.name}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.date}
              </td>
              <td className="px-6 py-4">{data.startTime}</td>
              <td className="px-6 py-4">{data.endTime}</td>
              <td className="px-6 py-4">{data.overtime}</td>
              <td className="px-6 py-4 text-right">
                <ModalButton id={data.id}></ModalButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KintaiTable;
