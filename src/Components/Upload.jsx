import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaImage, FaPlus, FaMobile } from "react-icons/fa";
import { db, storage } from "../Config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router";

const UploadProduct = () => {
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [url, setUrl] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [done, setDone] = useState(false);
  let allow = ["image/png", "image/jpeg"];

  const navigate = useNavigate();

  const handleUpload = () => {
    //     // reference where the files should be saved

    if (confirm("Are you sure this is the image to upload")) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadImage = uploadBytesResumable(storageRef, file);
      uploadImage.on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          // setProgress(percentage);
          console.log(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          // When the file is fully uploaded
          const url = await getDownloadURL(uploadImage.snapshot.ref);
          console.log(url);
          setUrl(url);
          if (url) {
            setDone(true);
          } else {
            console.log("loading...");
          }
          toast.success("Product Image successfully uploaded to the database");
        }
      );
    } else {
      toast.success("Product Image not uploaded...");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productDescription && productName && productPrice && url ) {
      const dbRef = collection(db, "products");
      addDoc(dbRef, {
        name:productName,
        description:productDescription,
        price:productPrice,
        createdAt: serverTimestamp(),
        imageUrl:url,
      });
      toast.success("Product successfully added to the database");
      setProductName("");
      setProductPrice(0);
      setProductDescription("");
      setUrl("");
      navigate("/");
    } else {
      toast.error("no field should be left out");
    }
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && allow.includes(selected.type)) {
      setFile(selected);
      toast.success("Product image successfuly selected");
      setError("");
      console.log("Done...");
    } else {
      setFile(null);
      setError("Please selecte an image file (png or jpeg");
      toast.error(error);
    }
    console.log(selected);
  };
  return (
    <div className="bg-black">
        <div className="  w-full  md:w-3/4 relative z-10 px-10   mx-auto py-24" >
      <h2 className="text-center flex justify-center gap-2 items-center text-3xl text-slate-300">
        Add New Product <FaMobile className=" text-green-700" />
      </h2>
      <form
        
        onSubmit={(e) => handleSubmit(e)}
        action="#"
        className=""
      >
        <div className=" my-5">
          <div className="name w-full md:full">
            <label
              htmlFor="name"
              className="my-2  items-center flex gap-2 text-slate-200"
            >
              Product Name <FaMobile className=" text-green-700" />
            </label>
            <input
              type="text"
              name="name"
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full"
              placeholder="product name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>
          
        </div>
        <div className="w-full my-1">
          <div className="description w-full md:w-full">
            <label
              htmlFor="name"
              className="my-2  items-center flex gap-2 text-slate-200"
            >
              Product Description <FaMobile className=" text-green-700" />
            </label>
            <input
              type="text"
              name="description"
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full md:w-full"
              placeholder="product description"
              onChange={(e) => setProductDescription(e.target.value)}
              value={productDescription}
            />
          </div>
          
        </div>
        <div className="my-5">
          <div className="price w-full md:w-full">
            <label htmlFor="price" className="my-2 block text-slate-200">
              Product Price <span className=" text-green-700">( ₦ )</span>
            </label>
            <input
              type="number"
              name="price"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              className="border text-sm border-slate-500 outline-none px-5 py-5 rounded-lg w-full"
              placeholder="product price ( in Naira )"
            />
          </div>
          
        </div>

        <div className="image w-full md:w-full flex md:my-5 flex-wrap md:flex-nowrap items-center gap-2 md:gap-10">
          <input
            type="text"
            value={file.name}
            onChange={(e) => changeHandler(e)}
            placeholder="product url"
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
        {!done ? (
          <button
            onClick={(e) => handleUpload(e)}
            className=" bg-green-800 active:bg-black active:p-4 active:transition-all 0.3s p-3 flex gap-2 items-center text-sm  mt-4 text-white rounded-full px-4"
          >
            <FaImage />
            Upload Product Image
          </button>
        ) : (
          <button
            onClick={(e) => handleSubmit(e)}
            className=" bg-green-800 active:bg-black active:p-4 active:transition-all 0.3s p-3 flex gap-2 items-center text-sm  mt-4 text-white rounded-full px-4"
          >
            <FaPlus />
            Add Product
          </button>
        )}
      </form>
      {/* <div className="progressbar">
        {
          file && <ProgressBar file={file} setFile={setFile} />
        }
      </div> */}
    </div>
    </div>
  );
};

export default UploadProduct;
