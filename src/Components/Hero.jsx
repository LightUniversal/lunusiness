// src/components/HeroSection.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import one from "../assets/imgs/one.jpg";
import two from "../assets/imgs/two.jpg";
import three from "../assets/imgs/three.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMobile } from "react-icons/fa";
import { db } from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore";
import PhoneCard from "./Single";

const HeroSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  <style>{`
    .slick-dots li button:before {
      font-size: 12px;
      color: #3490dc;
    }
    .slick-dots li.slick-active button:before {
      color: #ff6347;
    }
  `}</style>;
  const slides = [
    {
      id: 1,
      title: "Upgrade to the Latest Phones",
      description: "Discover amazing deals on new models.",
      buttonText: "Shop Now",
      imageUrl: one,
      style: "text-2xl md:text-5xl text-gray-100 font-bold mb-4 text-center",
      style_:
        "text-sm font-bold mx-12 md:mx-0 md:text-xl mb-6 text-center text-slate-200",
    },
    {
      id: 2,
      title: "Exclusive Offers on Accessories",
      description: "Complete your experience with top accessories.",
      buttonText: "Get Started",
      imageUrl: two,
      style: "text-2xl md:text-5xl text-slate-100 font-bold mb-4 text-center",
      style_:
        "text-sm font-bold mx-12 md:mx-0 md:text-xl mb-6 text-center text-slate-100",
    },
    {
      id: 3,
      title: "Exclusive Offers on Accessories",
      description: "Complete your experience with top accessories.",
      buttonText: "Explore",
      imageUrl: three,
      style: "text-2xl md:text-5xl text-slate-800 font-bold mb-4 text-center",
      style_:
        "text-sm font-bold mx-12 md:mx-0 md:text-xl mb-6 text-center text-slate-800",
    },
  ];

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
    <div className=" w-full bg-gray-100 text-white relative top-[30px] border">
      <Slider {...sliderSettings}>
      {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
