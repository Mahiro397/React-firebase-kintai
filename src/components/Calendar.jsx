import React, { useEffect, Fragment, useState } from 'react';


const Calendar = () => {
  //与えられた数字の前に０をつけて文字列の末尾から2文字を抽出する関数
  function zeroPadding(num) {
    return ('0' + num).slice(-2);
  }

  //現在の年を取得するusestate
  const [year, setYear] = useState(new Date().getFullYear());
  //現在の年を取得するusestate
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const calendar = createCalendear(year, month);
  const last = new Date(year, month, 0).getDate();
  const prevlast = new Date(year, month - 1, 0).getDate();

  //スケジュールのデータ
  const [schedules, setSche] = useState([]);

   // ポップアップの状態を管理するstate
   const [selectedDate, setSelectedDate] = useState(null);

   // 日付をクリックしたときにポップアップの状態を変更する関数
   const handleDateClick = (day) => {
     setSelectedDate(day);
   };

  //画面読み込み時に、1度だけ起動
  

  //データ一覧を取得
  

  //データ格納の空配列を作成
  let rows = [];

  //スケジュールデータをrowに格納する
  

  const onClick = n => () => {
    const nextMonth = month + n
    if (12 < nextMonth) {
      setMonth(1)
      setYear(year + 1)
    } else if (nextMonth < 1) {
      setMonth(12)
      setYear(year - 1)
    } else {
      setMonth(nextMonth)
    }
  }
  //
  function createCalendear(year, month) {
    //現在の月の最初の曜日を取得
    const first = new Date(year, month - 1, 1).getDay()
    //console.log(first)

    //第何週かを表す配列
    return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
      //曜日を表す配列
      return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {

        const day = dayIndex + 1 + weekIndex * 7
        return day - first
      })
    })
  }

  return (

    <div>
      <div className="bg-gray-200">
        <div className="container mx-auto mt-10">
          <div className="wrapper bg-white rounded shadow w-full ">
            <div className="header flex justify-between border-b p-2">
              <span className="text-lg font-bold">
                {`${year}年${month}月`}
              </span>
              <div className="buttons">
                <button className="p-1" onClick={onClick(-1)}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-arrow-left-circle"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                    />
                  </svg>
                </button>
                <button className="p-1" onClick={onClick(1)}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-arrow-right-circle"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.5 8a.5.5 0 0 1 .5-.5H5a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Sunday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sun</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Monday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Mon</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Tuesday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Tue</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Wednesday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Wed</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Thursday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Thu</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Friday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Fri</span>
                  </th>
                  <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                    <span className="xl:block lg:block md:block sm:block hidden">Saturday</span>
                    <span className="xl:hidden lg:hidden md:hidden sm:hidden block">Sat</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {calendar.map((week, i) => (
                  <tr className="text-center h-20" key={week.join('')}>
                    {week.map((day, j) => (
                      <td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                        <div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                          <div className="top h-5 w-full">
                            <span className="text-gray-500"> {day > last ? day - last : day <= 0 ? prevlast + day : day}</span>
                            <div className="schedule-area h-20 ">
                             
                            </div>
                          </div>
                          <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Calendar