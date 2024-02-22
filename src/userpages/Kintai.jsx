import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../main.jsx';
import { addDoc, collection, updateDoc, getDoc, doc } from 'firebase/firestore';
import Header from '../components/Header.jsx';
import { useState, useEffect } from 'react';
import Clock from '../components/Clock.jsx';

const Kintai = () => {
  const navigate = useNavigate();
  const [shukkinTime, setShukkinTime] = useState(' ');
  //出勤ボタンを一回しか押せないようにするstate
  const [shukkinButton, setShukiinButton] = useState(false);
  //退勤ボタンを一回しか押せないようにするstate
  const [taikinButton, settaiButton] = useState(true);

  // const [currentTime, setCurrentTime] = useState(new Date());

  const authUser = auth.currentUser;

  //ログインしているかどうか確認するEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //console.log(user);
        //console.log('ログインしています');
      } else {
        // ユーザーがログインしていない場合の処理
        //console.log('ログインしていません');
        navigate('/Login');
      }
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, [navigate]);

  //出勤ボタンを押したときの処理
  const shukkin = () => {
    const currentTime = new Date().toISOString();

    setShukkinTime(currentTime);
    setShukiinButton(true);
    settaiButton(false);
  };

  const taikin = async () => {
    const currentTime = new Date();

    try {
      // 出勤時間と退勤時間の差分を計算
      const shukkinDateTime = new Date(shukkinTime);
      const workingHours = currentTime - shukkinDateTime;
      const diffHours = workingHours / (1000 * 60 * 60);

      // 小数点以下の時間を整数時間と分に変換
      const hours = Math.floor(diffHours);
      const minutes = Math.round((diffHours - hours) * 60);

      // 残業時間を計算
      const overtime = Math.max(diffHours - 9, 0);
      const overtimeHours = overtime < 0 ? 0 : Math.floor(overtime);
      const overtimeMinutes = Math.round((overtime - overtimeHours) * 60);
      const overtimeString = overtimeHours + '時間' + overtimeMinutes + '分';

      const newDocRef = await addDoc(collection(db, 'attendance'), {
        auth: authUser.uid,
        auth_name: authUser.displayName,
        clock_in_time: shukkinTime,
        clock_out_time: currentTime.toISOString(),
        overtime: overtimeString,
      });

      setShukiinButton(true);
      settaiButton(false);
      alert('出勤データが登録されました');
      //console.log('新しいドキュメントが追加されました:', newDocRef.id);
      navigate('/Top');
    } catch (error) {
      console.error('データの登録に失敗しました:', error);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="text-center">
        <Clock></Clock>

        <div className=" flex-col items-center space-y-4">
          <p>出勤時間：{Date(shukkinTime)}</p>
          <button
            onClick={shukkin}
            disabled={shukkinButton}
            className="bg-blue-400 hover:bg-blue-300 text-white rounded px-12 py-4 m-1.5"
            type="button"
          >
            出勤
          </button>
          <button
            onClick={taikin}
            disabled={taikinButton}
            className="bg-blue-400 hover:bg-blue-300 text-white rounded px-12 py-4 mg m-1.5"
            type="button"
          >
            退勤
          </button>
        </div>
      </div>
    </>
  );
};

export default Kintai;
