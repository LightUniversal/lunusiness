// src/components/PhoneSwappingPage.js
import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase";
import swap from "../assets/imgs/swap.png";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PhoneSwappingPage = () => {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneModel: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch phones from Firebase
  useEffect(() => {
    const fetchPhones = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setPhones(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchPhones();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit swap request to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPhone) {
      alert("Please select a phone to swap.");
      return;
    }
    setLoading(true);
    try {
      const swapRequestsCollectionRef = collection(db, "swapphones");
      await addDoc(swapRequestsCollectionRef, {
        ...formData,
        selectedPhoneId: selectedPhone.id,
        selectedPhoneName: selectedPhone.name,
        timestamp: new Date(),
      });
      alert("Swap request submitted successfully!");
      setFormData({ name: "", phoneModel: "", message: "" });
    } catch (error) {
      console.error("Error submitting swap request:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-5 relative top-10 my-5">
      <h1 className="text-2xl flex justify-center gap-5 items-center py-2 font-bold text-center mb-5">
        Classical Phone Swap
        <FaExchangeAlt className=' text-slate-900' />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {phones.map((phone) => (
          <div
            key={phone.id}
            className={`p-4 border rounded-lg ${
              selectedPhone?.id === phone.id
                ? "border-blue-500"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedPhone(phone)}
          >
            <div
              className="h-48 bg-cover bg-center mb-4 rounded-lg"
              style={{ backgroundImage: `url(${phone.imageUrl})` }}
            ></div>
            <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
            <p className="text-gray-600 mb-4">{phone.description}</p>
            <p className="text-lg font-bold justify-between flex items-center text-green-600">
              ( ₦ {phone.price} ) <Link to={`/swap/${phone.id}`} href="tel:+2347058032078" className=' flex items-center text-sm font-bold gap-3 border bg-black rounded-lg text-slate-100 px-5 py-3'>
            Swap <FaExchangeAlt className=' text-green-700' />
        </Link>
            </p>
          </div>
        ))}
      </div>

      <div className="swapdetails flex-wrap md:flex-nowrap justify-center flex gap-10 my-5 items-center">
        <div className="  rounded-md">
          <img src={swap} alt="" />
        </div>
        <div className="w-full p-5 md:w-3/4">
          <h3 className="text-4xl font-semibold text-slate-700 mb-2">
            Thinking of Swapping Your Phone?
          </h3>
          <p className="text-gray-700">
            Swapping your phone is a great way to upgrade to a new device
            without the hassle of selling your old one. Simply browse our
            selection of available phones, find one that matches your needs, and
            submit a swap request.
          </p>
          <p className="text-gray-700 mt-2">
            <strong>How it works:</strong> After you submit a swap request, our
            team will review it and get in touch with you for the next steps.
            Make sure to provide accurate details so we can match you with the
            perfect phone!
            <br />
            <small className="font-bold text-slate-800">Check phones available for swap</small>
          </p>
          <br />
          <a href="#available" className=" p-2 rounded-md px-5 bg-green-800 text-white inline-block">View</a>
        </div>
      </div>
    </div>
  );
};

export default PhoneSwappingPage;
