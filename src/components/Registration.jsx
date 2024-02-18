import React from 'react';
import { useState } from "react";
import { auth, db } from "../main.jsx";
import { addDoc, collection, updateDoc, getDoc, doc } from "firebase/firestore";

const Registration = () => {
  

  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl mb-4">出退勤編集フォーム</h2>
      
    </div>
  );
};

export default Registration;
