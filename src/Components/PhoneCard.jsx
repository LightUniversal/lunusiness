// src/components/PhoneCard.js
import React from 'react';
import { FaExchangeAlt, FaPhone, FaSwift } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PhoneCard = ({ phone }) => {
  return (
    <div  className="bg-white shadow-lg rounded-lg overflow-hidden w-full p-3">
      <div
        className="h-48 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${phone.imageUrl})` }}
      ></div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">- {phone.name} -</h2>
        <p className="text-gray-600 text-sm font-medium mb-4"> ( {phone.description} )</p>
        <p className="text-md font-medium text-green-600">₦{phone.price} </p>
      </div>
      <div className="flex w-full justify-between">
        <a href="tel:+2347058032078" className=' flex  items-center  text-green-700 text-sm font-bold gap-3  border-slate-500  border-r   px-5 py-3'>
            Order Now <FaPhone className='  text-slate-700' />
        </a>
        <Link to={`/swap/${phone.id}`} href="tel:+2347058032078" className=' flex items-center text-sm font-bold gap-3 border bg-black rounded-lg text-slate-100 px-5 py-3'>
            Swap <FaExchangeAlt className=' text-green-700' />
        </Link>
      </div>
    </div>
  );
};

export default PhoneCard;
