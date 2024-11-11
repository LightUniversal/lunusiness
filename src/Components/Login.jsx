import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaExchangeAlt, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const navigate = useNavigate("/");

//   Check user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser)
      if(auth.currentUser.emailVerified || auth.currentUser) {
        toast.success("You are Logged In")
        navigate("/")
      }
      // Redirect or take any action on successful login
    } catch (err) {
      // setError('Invalid login credentials');
      toast.error(err.message)
    }
  };

  return (
    <div className="flex bg-gray-100 justify-center  relative   py-20 ">
      <div className="w-full max-w-md p-8 space-y-4 bg-black  shadow-lg ">
        <h2 className="text-xl flex font-bold gap-3 items-center justify-center border-dashed border-b border-green-900 py-5 text-slate-100 text-center">Login to Phone Swap <FaExchangeAlt className='text-green-600' /></h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full px-4 flex justify-center gap-2 items-center py-5 font-semibold text-white bg-green-600 rounded-lg hover:bg-indigo-700"
          >
            Login <FaSignInAlt />
          </button>
        </form>
        <p className="text-center text-slate-50">
          Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
