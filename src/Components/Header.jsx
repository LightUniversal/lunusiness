import React, { useState } from "react";
import {
  FaServicestack,
  FaBars,
  FaHome,
  FaPhone,
  FaInfoCircle,
  FaUserAlt,
  FaMobile,
  FaExchangeAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ toggle, setToggle }) => {
  return (
    <header className="fixed top-0 w-full flex justify-between z-[6000] border-b border-slate-700 shadow-md bg-black text-white p-5 px-10 items-center">
      <Link to={"/"} className=" font-bold text-blue-100 relative -left-5 top-1 text-lg md:text-2xl">
        Reckon-Enterprise 
      </Link>
      {/* <div className="socials flex items-center gap-3">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
        </div> */}
      <nav>
        <button
          onClick={() => {
            setToggle((prev) => !prev)
            console.log("Logging...", toggle);
          }}
          className=" absolute text-green-700 md:hidden inline-block top-6 text-2xl right-5"
        >
          <FaBars />
        </button>

        <motion.ul
          className={
            toggle == false
              ? " animate__animated animate__fadeInDown hidden md:flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute right-0 top-16 md:top-0 md:right-0 md:w-full py-4  bg-slate-950 md:bg-transparent md:py-0 w-60 gap-10 items-center"
              : " animate__animated animate__fadeInDown flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute right-0 top-16 md:top-0 md:right-0 md:w-full py-4 rounded-lg  bg-slate-950 md:bg-transparent md:py-0 w-60 gap-10 items-center"
          }
        >
          <li>
            <Link
              to={"/"}
              className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
            >
              Home <FaHome className=" text-blue-200 text-sm" />
            </Link>
          </li>
          <li>
            <Link
              to={"/addproduct"}
              className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
            >
              UploadProduct <FaMobile className=" text-blue-200 text-sm" />
            </Link>
          </li>
          <li>
            <Link
              to={"/swap"}
              className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
            >
              Swap <FaExchangeAlt className=" text-blue-200 text-sm" />
            </Link>
          </li>
          
          
          <li>
            <Link
              to={"/contact"}
              className="transition-border-width text-white duration-500 ease font-medium items-center hover:border-t-2 hover:border-blue-500 p-2 text-sm flex gap-2"
            >
              Contact <FaServicestack className=" text-blue-200 text-sm" />
            </Link>
          </li>
        </motion.ul>
      </nav>
    </header>
  );
};

export default Header;
