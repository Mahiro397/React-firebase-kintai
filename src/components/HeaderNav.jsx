import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout.jsx';

const HeaderNav = () => {
  return (
    <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">kinntai</span>
      </a>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link
          to="/Kintai"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          {' '}
          勤怠ページ
        </Link>
        <Link
          to="/Top"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          {' '}
          Topページ
        </Link>
      </nav>
      <Logout></Logout>
    </div>
  );
};

export default HeaderNav;
