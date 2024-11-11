import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore";
import PhoneCard from "./PhoneCard";
import swap from "../assets/imgs/swap.png";
import img from "../assets/imgs/img.jpg";

import { FaExchangeAlt, FaMobile } from "react-icons/fa";
import { Link } from "react-router-dom";

const PhoneLists = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setPhones(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPhones();
  }, []);

  return (
    <div className=" bg-gray-100 my-1 relative top-6">
      <header className="text-center py-5 bg-black text-white">
        <h1 className="md:text-3xl font-medium px-10 text-md py-3 flex gap-2 items-center justify-center">
          Classical Phone Store <FaMobile className=" text-green-600" />
        </h1>
      </header>
      <main className="container mx-auto p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </main>
      <footer>
        <div className="swapdetails flex-wrap md:flex-nowrap justify-center flex gap-10 my-5 items-center">
          <div className="  rounded-md">
            <h3 className="text-3xl text-slate-600 mb-4 font-bold px-7">
              Purchase with Ease
            </h3>
            <p className="my-2  text-sm text-slate-800 px-7">
              Whether you're looking to upgrade to a newer model, exchange your
              current phone for a different brand, or purchase a pre-owned
              device at a great price, we make the process simple and
              transparent.
            </p>
            <img src={swap} alt="" />
          </div>
          <div className="w-full p-7 md:w-3/4">
            <h3 className="text-3xl font-semibold text-slate-700 mb-2">
              Thinking of Swapping Your Phone?
            </h3>
            <p className="text-gray-700 text-sm my-3">
              Swapping your phone is a great way to upgrade to a new device
              without the hassle of selling your old one. Simply browse our
              selection of available phones, find one that matches your needs,
              and submit a swap request.
            </p>
            <p className="text-gray-700 mt-2 py-1 text-sm">
              <strong>How it works:</strong> After you submit a swap request,
              our team will review it and get in touch with you for the next
              steps. Make sure to provide accurate details so we can match you
              with the perfect phone!
              <br />
              <small className="font-bold text-slate-800">
                Check phones available for swap
              </small>
            </p>
            <br />
            <Link
              to={"/swap"}
              className=" flex p-3 rounded-md items-center gap-4 px-5 bg-green-800 justify-center text-white w-[200px]"
            >
              Get Started <FaExchangeAlt className=" text-slate-100" />
            </Link>
          </div>
        </div>
        <div className="flex">
        </div>
      </footer>
    </div>
  );
};

export default PhoneLists;
