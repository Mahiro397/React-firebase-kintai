import React, { useState, useEffect } from 'react';
import { auth } from '../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout.jsx';
import HeaderNav from './HeaderNav.jsx';

const Header = () => {
  return (
    <header className="text-gray-600 body-font bg-orange-200">
      <HeaderNav></HeaderNav>
    </header>
  );
};

export default Header;
