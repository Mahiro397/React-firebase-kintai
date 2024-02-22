import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../main.jsx';

const PostForm = ({ id }) => {
  const [shukinTime, setShukinTime] = useState('');
  const [taikinTime, setTaikinTime] = useState('');

  const handleUpdate = async (id) => {
    //フォームで入力したデータをISO形式の文字列に変換
    const isoShukinTime = new Date(shukinTime).toISOString();
    const isoTaikinTime = new Date(taikinTime).toISOString();

    //
    const workingHours = new Date(isoTaikinTime) - new Date(isoShukinTime);
    console.log(workingHours);
    const diffHours = workingHours / (1000 * 60 * 60);

    // 小数点以下の時間を整数時間と分に変換
    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);

    // 残業時間を計算
    const overtime = Math.max(diffHours - 9, 0);
    const overtimeHours = overtime < 0 ? 0 : Math.floor(overtime);
    const overtimeMinutes = Math.round((overtime - overtimeHours) * 60);
    const overtimeString = overtimeHours + '時間' + overtimeMinutes + '分';

    // 出勤情報の更新
    await updateDoc(doc(db, 'attendance', id), {
      clock_in_time: shukinTime,
      clock_out_time: taikinTime,
      overtime: overtimeString,
    });

    console.log('更新成功');
  };

  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl mb-4">編集フォーム</h2>
      <div className="mb-4">
        <h3 className="font-bold">出勤時間</h3>
        <label>
          日付:
          <input
            value={shukinTime}
            onChange={(e) => setShukinTime(e.target.value)}
            type="datetime-local"
            name="shukinTime"
            step="300"
          />
        </label>
      </div>
      <div className="mb-4">
        <p className="font-bold">退勤時間</p>
        <label>
          時間：
          <input
            value={taikinTime}
            onChange={(e) => setTaikinTime(e.target.value)}
            type="datetime-local"
          />
        </label>
      </div>

      <button
        onClick={() => handleUpdate(id.id)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        更新
      </button>
    </div>
  );
};

export default PostForm;
