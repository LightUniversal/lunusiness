// src/components/PhoneCard.js
import React from 'react';
import { FaExchangeAlt, FaPhone, FaSwift } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PhoneCard = ({ phone }) => {
  return (
    <Link to={`/swap/${phone.id}`}  className="bg-white block shadow-lg rounded-lg overflow-hidden w-full p-3 border ">
      <div
        className="h-[300px] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${phone.imageUrl})` }}
      ></div>
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-xl font-semibold">{phone.name}</h2>
        <p className="text-gray-600 text-sm font-medium mb-1">{phone.description}</p>
        <p className="text-xl font-medium text-green-600">  -- ₦{phone.price} - </p>
      </div>
      
    </Link>
  );
};

export default PhoneCard;
