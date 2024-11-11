import React, { useState } from "react";
import {
  FaFacebook,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaTwitter,
  FaEnvelope,
  FaPaperPlane,
  FaHandshake,
} from "react-icons/fa";

const Contact = () => {

  const [reply, setReply] = useState("");

  const submitReply = (e) => {
    e.preventDefault();

  }



  return (
    <div className=" ">
      <div className="contact text-slate-100">
      <section className="  flex flex-col p-10 flex-wrap gap-2 h-[400px]  items-center justify-center font-bold" style={{ backgroundColor:"rgba(00,0,0,0.9)"}}>
        <h2 className="title text-3xl text-center">
          Contact Us
        </h2>
        <p className=" font-medium text-md text-center  p-5 " >
          Reach out to us for today, we are there to help you transform your ideas into workable software services
        </p>
      </section>
      </div>
      
      <div className="flex md:flex-nowrap flex-wrap px-5 py-5 items-center mt-20 gap-5">
      <section className="px-5 ">
        <h1 className="email">
          Email Us 
        </h1>
        <h5 className="text-blue-400 text-sm ">
          <a href="mailto:lightsinfo78@gmail.com" className=" bg-slate-50 w-[300px] p-6 rounded-lg  flex gap-1 items-center">Email Us <FaEnvelope />  </a>
        </h5>
        <h1 className="email mt-5">
          Call Us 
        </h1>
        <h5 className="text-blue-700 text-sm ">
          <a href="mailto:lightsinfo78@gmail.com" className="  bg-slate-50 w-[300px] p-6 rounded-lg  flex gap-1 items-center">Call Us <FaPhone /> </a>
        </h5>
        <h1 className="email mt-5">
          Send Us Direct message (sms) 
        </h1>
        <h5 className="text-blue-700 text-sm ">
          <a href="sms:+2347058032078" className="  bg-slate-50 w-[300px] p-6 rounded-lg  flex gap-1 items-center">click Here<FaEnvelope />  </a>
        </h5>
      </section>
      <section className="message w-full md:w-3/4">
        <form action="#" onSubmit={(e) => submitReply(e)}>
        <textarea name="message" value={reply} onChange={(e) => setReply(e.target.value)} id="message" className=" border outline-none border-slate-50 text-sm rounded-md shadow-md w-full p-5" cols={"100"} rows={"10"} placeholder="Leave a message for us"></textarea>
        <button type="submit" onClick={(e) => submitReply(e)} className=" flex gap-2 items-center bg-black text-white px-5 rounded-md py-3 ">Send <FaPaperPlane /></button>
        </form>
      </section>
      </div>
    </div>
  );
};

export default Contact;
