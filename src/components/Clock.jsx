import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      // 1秒ごとに現在の時刻を更新
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      // コンポーネントがアンマウントされたときにクリーンアップ
      return () => clearInterval(intervalId);
    }, []);
  
    // 時刻をフォーマットする関数
    const formatTime = (time) => {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const seconds = time.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
  
    return (
<div className="App w-full mt-16 mb-16 flex flex-col items-center justify-center">
  <h2 className="font-bold text-2xl mb-4">出退勤フォーム</h2>
  <h2 className="font-bold  mb-4 text-8xl">{formatTime(currentTime)}</h2>
</div>
    );
  }

export default Clock