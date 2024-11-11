// src/components/PhoneDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage, auth } from "../Config/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

import { doc, getDoc } from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";

const PhoneDetail = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState("");
  const [error, setError] = useState("");

  // const [url, setUrl] = useState("");
  // const [done, setDone] = useState(false);

  // const [file, setFile] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(auth.currentUser.email)
  const [formData, setFormData] = useState({
    name: "",
    email: auth.currentUser ? auth.currentUser.email : "",
    number: "",
    phoneModel: "",
    description: "",
    contactPreference: "email",
    acceptTerms: false,
    receipt: "",
    img: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  let allow = ["image/png", "image/jpeg"];


  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && allow.includes(selected.type)) {
      setFile(selected);
      toast.success("image successfuly selected");
      setError("");
      console.log("Done...");
    } else {
      setFile(null);
      setError("Please selecte an image file (png or jpeg");
      toast.error(error);
    }
    console.log(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // For testing; replace with your form submission logic
    const dbRef = collection(db, "userswap");
    addDoc(dbRef, {
      ...formData,
      createdAt: serverTimestamp(),
    });
    toast.success("Product successfully added to the database");
    setTimeout(() => {
      toast.success(
        "Phone is been processed and this takes 24hours. We will respond ones the process is complete "
      );
    }, 4000);
    setFormData({
      name: "",
      email: "",
      number: "",
      phoneModel: "",
      phoneCondition: "",
      description: "",
      contactPreference: "email",
      acceptTerms: false,
      receipt: "",
    });
    navigate("/");
  };

  console.log(id);

  // const changeHandler = (e) => {
  //   let selected = e.target.files[0];
  //   if (selected && allow.includes(selected.type)) {
  //     setFile(selected);
  //     toast.success("Product image successfuly selected");
  //     setError("");
  //     console.log("Done...");
  //   } else {
  //     setFile(null);
  //     setError("Please selecte an image file (png or jpeg");
  //     toast.error(error);
  //   }
  //   console.log(selected);
  // };

  // upload phone receipt
  // const uploadReceipt = () => {
  //   if (confirm("You are to upload the phone receipt")) {
  //     const storageRef = ref(storage, `usersphonereceipt/${file.name}`);
  //     const uploadImage = uploadBytesResumable(storageRef, file);
  //     uploadImage.on(
  //       "state_changed",
  //       (snap) => {
  //         let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //         // setProgress(percentage);
  //         console.log(percentage);
  //       },
  //       (err) => {
  //         setError(err);
  //       },
  //       async () => {
  //         // When the file is fully uploaded
  //         const url = await getDownloadURL(uploadImage.snapshot.ref);
  //         console.log(url);
  //         setUrl(url);
  //         if (url) {
  //           setDone(true);
  //         } else {
  //           console.log("loading...");
  //         }
  //         toast.success("Done...");
  //       }
  //     );
  //   } else {
  //     toast.error("Image not uploaded...");
  //   }
  // }
  // upload phone receipt
  // const uploadPhone = () => {
  //   if (confirm("You are to upload the phone receipt")) {
  //     const storageRef = ref(storage, `usersphonere/${file.name}`);
  //     const uploadImage = uploadBytesResumable(storageRef, file);
  //     uploadImage.on(
  //       "state_changed",
  //       (snap) => {
  //         let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
  //         // setProgress(percentage);
  //         console.log(percentage);
  //       },
  //       (err) => {
  //         setError(err);
  //       },
  //       async () => {
  //         // When the file is fully uploaded
  //         const url = await getDownloadURL(uploadImage.snapshot.ref);
  //         console.log(url);
  //         setUrl(url);
  //         if (url) {
  //           setDone(true);
  //         } else {
  //           console.log("loading...");
  //         }
  //         toast.success("Done...");
  //       }
  //     );
  //   } else {
  //     toast.error("Image not uploaded...");
  //   }
  // }

  useEffect(() => {
    const fetchPhone = async () => {
      setLoading(true);
      try {
        // Fetch phone data from Firestore
        const phoneRef = doc(db, "products", id);
        // const userspace = doc(db, "userspace");
        const phoneSnap = await getDoc(phoneRef);
        // const userspacesnap = await getDoc(userspace);

        if (phoneSnap.exists()) {
          const phoneData = phoneSnap.data();
          setPhone(phoneData);

          // Fetch image from Firebase Storage using the image path in Firestore
          // const storage = getStorage();
          // const imageRef = ref(storage, phoneData.imagePath); // assuming imagePath is stored in Firestore
          // const url = await getDownloadURL(imageRef);
          // // setImageURL(url);
        } else {
          console.log("Phone not found");
        }
      } catch (error) {
        console.error("Error fetching phone:", error);
      }
      setLoading(false);
    };

    fetchPhone();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!phone) {
    return <p>Phone not found.</p>;
  }

  return (
    <div className="container mx-auto p-5 py-20 pb-3">
      <h2 className="text-xl font-bold text-green-800 mb-5">{phone.name}</h2>
      <div className="flex flex-col justify-center gap-10 md:flex-row ">
        <div className="w-full md:h-[450px] md:w-3/5 border bg-slate-50 bg-opacity-[0.6] border-slate-100  p-5 rounded-lg">
          <div
            className="h-[200px] bg-cover  bg-center mb-4 rounded-lg"
            style={{ backgroundImage: `url(${phone.imageUrl})` }}
          ></div>
          <h2 className="text-2xl font-semibold text-green-800 mb-2">{phone.name}</h2>
          <p className="font-medium text-sm mb-4 text-green-800">{phone.description}</p>
          <p className="text-lg font-medium justify-between flex items-center text-green-900">
            ₦ {phone.price}{" "}
            <a
              href="tel:+2347058032078"
              className=" flex items-center text-sm font-bold gap-3 border bg-slate-700 rounded-lg text-slate-100 px-5 py-3"
            >
              Buy <FaShoppingCart className=" text-green-400" />
            </a>
          </p>
        </div>
        <div className="forms w-full px-3 md:w-3/4 bg-slate-50 bg-opacity-[0.6] py-3">
          <h2 className="text-2xl mb-1  font-bold text-green-800">
            Ready to Swap? <br />
            <p className="text-sm mb-2 text-slate-700 mt-3 font-normal ">
            The "swap" feature lets you trade your phones with others,
            offering a budget-friendly alternative to buying or selling.
          </p>
            
          </h2>
          <p className="text-green-800  my-5   font-bold text-[17px]">
              Provide Your Phone Details
            </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

                placeholder="Enter your email"
                required
              />
            </div>
            {/* Phone Number Input */}
            <div>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

                placeholder="Enter your Phone numnber"
                required
              />
            </div>

            {/* Phone Model Dropdown */}
            <div>
              <select
                name="phoneModel"
                value={formData.phoneModel}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

                required
              >
                <option value="">Select your phone model</option>
                <option value="iPhone 12">iPhone 12</option>
                <option value="Samsung Galaxy S21">Iphone 11</option>
                <option value="Iphone 10">Iphone 10</option>
                <option value="Google Pixel 5">Iphone XR</option>
                <option value="Iphone XX">Iphone XX</option>
                <option value="Iphone X">Iphone X</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Phone Condition Radio Buttons */}
            {/* <div>
              <label className="block text-black font-bold pt-4 px-3">
                Phone Condition
              </label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center  p-3 rounded-md active:text-white active:bg-slate-900 cursor-pointer focus:bg-green-600">
                  <input
                    type="radio"
                    name="phoneCondition"
                    value="Excellent"
                    checked={formData.phoneCondition === "Excellent"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Excellent
                </label>
                <label className="flex items-center  p-3 rounded-md active:text-white active:bg-slate-900 cursor-pointer focus:bg-green-600">
                  <input
                    type="radio"
                    name="phoneCondition"
                    value="Good"
                    checked={formData.phoneCondition === "Good"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Good
                </label>
                <label className="flex items-center  p-3 rounded-md active:text-white active:bg-slate-900 cursor-pointer focus:bg-green-600">
                  <input
                    type="radio"
                    name="phoneCondition"
                    value="Fair"
                    checked={formData.phoneCondition === "Fair"}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  Fair
                </label>
              </div>
            </div> */}

            {/* Description Text Area */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

                placeholder="Describe your phone's condition and features"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Contact Preference Select */}
            <div>
              <label className="block text-green-800 px-3 font-bold">
                Contact Preference
              </label>
              <select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleChange}
                className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            {/* upload phone image */}
            <div className="image w-full md:w-full flex md:my-5 flex-wrap md:flex-nowrap items-center gap-2 md:gap-10">
          <input
            type="text"
            value={file.name}
            onChange={(e) => changeHandler(e)}
            placeholder="upload phone image"
            className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"
            id="image"
          />
          <input
            type="file"
            name="image"
            className=" py-5 file:bg-green-800 w-full cursor-pointer file:outline-none file:border-none file:px-5 file:rounded-lg text-white  file:py-2 file:text-sm file:text-white  inline-block mx-1"
            id="file"
            onChange={(e) => changeHandler(e)}
          />
        </div>
            {/* Accept Terms Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                I accept the{" "}
                <a
                  href="/terms-and-conditions"
                  className="text-blue-600 underline"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-4 px-4 bg-green-800 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Process Swap
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="termsforms my-5 p-5 flex gap-10 flex-wrap md:flex-nowrap">
        {/* <div className="terms w-full md:w-3/5 ">
          <h1 className=" text-slate-400 font-bold text-2xl">
            Terms and Condition
          </h1>
          <p className="mb-4 text-lg mt-1 text-slate-700 font-medium ">
            By using our Phone Swap service, you agree to the following terms:
          </p>

          <p className="text-sm leading-[30px] text-slate-700 text-justify">
            By using our Phone Swap service, you agree to the following terms.
            Please read them carefully to understand your responsibilities. Our
            Service is only available to individuals 18 years or older who are
            the legal owners of the devices they intend to swap. Devices
            submitted for a swap must be fully functional and in good condition.
            Phones with significant issues, such as screen damage, water
            exposure, or battery malfunctions, may not qualify for a swap. Each
            device will be reviewed to ensure it meets our quality standards,
            and we reserve the right to decline devices that do not. To protect
            your data, please back up and permanently remove all personal
            information from the device before sending it. We are not
            responsible for any data left on swapped devices, nor do we take
            liability for data loss during the swap. Swaps are final.  It is your responsibility to ensure the
            device received meets your expectations before finalizing the swap.
            Each party is responsible for their own shipping costs and is
            advised to use tracking and insurance. For questions, contact us at.
          </p>

          <p className="mt-6">
            For questions or support, please contact us at{" "}
            <a href="mailto:support@yourcompany.com" className="text-blue-600">
              support@yourcompany.com
            </a>
            .
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PhoneDetail;
