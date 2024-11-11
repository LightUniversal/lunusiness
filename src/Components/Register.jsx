import { useState } from "react";
import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaExchangeAlt, FaSignInAlt } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    let user, credentials;
    try {
      if (cpassword === password) {
        console.log("Okay...");
        credentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = credentials.user;
        // Save user role to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          isAdmin: false, // Admin status field
        });
        await sendEmailVerification(user);
        
        toast.success(`"A verification email has been sent to your email address. Please verify before logging in."`);
      } else {
        console.log();
        toast.error("Password does not match...");
      }
      // Redirect or perform actions on successful registration
      navigate("/login");
      console.log("Done...");
    } catch (err) {
      console.log(err.message);
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email Already in use");
        toast(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center  py-20  bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-black  shadow-lg ">
        <h2 className="text-lg flex items-center text-slate-200 border-b border-green-700 py-3 gap-2 justify-center font-bold text-center">
          Register for Phone Swap <FaExchangeAlt className='text-green-700' />
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

          />
          <input
            type="password"
            placeholder="Comfirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            className="border text-[13px] border-slate-500 text-slate-700 outline-none px-5 py-5 rounded-lg w-full"

          />
          <button
            type="submit"
            className="w-full px-4 py-5 flex gap-2 justify-center items-center font-semibold text-white bg-green-600 rounded-lg hover:bg-indigo-700"
          >
            Register <FaSignInAlt />
          </button>
        </form>
        <p className="text-center text-slate-50">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
