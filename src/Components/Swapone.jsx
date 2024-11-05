// src/components/PhoneDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../Config/firebase";
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
  // const [url, setUrl] = useState("");
  // const [done, setDone] = useState(false);

  // const [file, setFile] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      <h2 className="text-3xl font-bold mb-5">{phone.name}</h2>
      <div className="flex flex-col justify-center gap-10 md:flex-row ">
        <div className="w-full md:h-[450px] md:w-3/5 border  p-5 rounded-lg">
          <div
            className="h-[200px] bg-cover  bg-center mb-4 rounded-lg"
            style={{ backgroundImage: `url(${phone.imageUrl})` }}
          ></div>
          <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
          <p className="text-gray-600 mb-4">{phone.description}</p>
          <p className="text-lg font-bold justify-between flex items-center text-green-700">
            ₦ {phone.price}{" "}
            <a
              href="tel:+2347058032078"
              className=" flex items-center text-sm font-bold gap-3 border bg-green-700 rounded-lg text-slate-100 px-5 py-3"
            >
              Buy <FaShoppingCart className=" text-white" />
            </a>
          </p>
        </div>
        <div className="forms w-full px-1 md:w-3/4">
          <h2 className="text-3xl mb-6 font-bold text-slate-600">
            Provide Your Phone Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-100 rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-100 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Phone Number Input */}
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-100 rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone Model Dropdown */}
            <div>
              <label className="block text-gray-600">Phone Model</label>
              <select
                name="phoneModel"
                value={formData.phoneModel}
                onChange={handleChange}
                className="w-full mt-1 p-3 outiline h-[60px] bg-black text-white cursor-pointer border border-gray-100 rounded-lg"
                required
              >
                <option value="">Select your phone model</option>
                <option value="iPhone 12">iPhone 12</option>
                <option value="Samsung Galaxy S21">Samsung Galaxy S21</option>
                <option value="Google Pixel 5">Google Pixel 5</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Phone Condition Radio Buttons */}
            <div>
              <label className="block text-gray-600 pt-4">
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
            </div>

            {/* Description Text Area */}
            <div>
              <label className="block text-gray-600 text-md mt-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-100 rounded-lg"
                placeholder="Describe your phone's condition and features"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Contact Preference Select */}
            <div>
              <label className="block text-gray-600">Contact Preference</label>
              <select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-100 rounded-lg"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
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
                className="w-full py-4 px-4 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition"
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
