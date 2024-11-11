import React, { useState } from "react";

import {
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaMedium,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" bg-black">
      <div className="footer p-10  border-t w-full flex  gap-10 flex-wrap  text-white md:justify-between">
        <div className="name text-white md:w-3/12">
          <h2 className="text-lg mb-1 font-medium">
            <abbr title="Light Universal Intelligence" className=" text-sm no-underline text-blue-50">
            ReckonLui [ <small className="">Reckon-Light-Universal-Intelligence ]</small>
            </abbr>
          </h2>
          <p className="text-sm">Our Phone Store and Swap provides a unique platform for customers to buy, sell, and swap mobile phones with ease and confidence. 
            <br />
          </p>
        </div>
        <div className="links text-white ">
          <h2 className="text-sm mb-3 font-bold">Follow us on</h2>
          <div className="flex gap-3 mt-3">
            <a href="#" className="text-green-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-green-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-green-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-green-500">
              <FaLinkedin />
            </a>
          </div>
          <div className="others">
            <h3 className=" font-bold my-3  text-sm">Other Links</h3>
            <div className=" flex  flex-col gap-3 ">
              <a href="/" className=" flex items-center  text-sm text-green-500 gap-3">
                Home
              </a>
              <a href="/" className=" flex items-center text-sm text-green-500 gap-3">
                About
              </a>
              <a href="/" className=" flex items-center text-sm text-green-500 gap-3">
                Events
              </a>
              <a href="/" className=" flex items-center text-sm text-green-500 gap-3">
                Community
              </a>
            </div>
          </div>
        </div>
        <div className="sub  text-white">
          <h2 className="text-sm mb-3 font-medium">
            Subscribe for relevant email updates
          </h2>
          <div className="form">
            <form action="#" className="flex gap-2 flex-wrap">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your valid email"
                className=" p-3 border border-slate-800 w-full text-slate-800 text-sm font-medium bg-black outline-none rounded-md"
              />
              <button
                type="submit"
                className="flex gap-3 items-center border-none bg-green-700 text-sm font-medium p-3 text-white px-3 rounded-md"
              >
                Submit <FaEnvelope />{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-slate-100 border-t p-5 font-normal text-sm">
        copyright ReckonLui {year}
      </p>
    </div>
  );
};
export default Footer;
