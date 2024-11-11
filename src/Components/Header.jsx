import { useState, useEffect } from "react";
import {
  FaServicestack,
  FaBars,
  FaHome,
  FaExchangeAlt,
  FaUser,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";

const Header = ({ toggle, setToggle }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check user login status and fetch admin status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch the user's isAdmin status from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.data();
        setIsAdmin(userData?.isAdmin || false);
        console.log(isAdmin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  });

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("You are logged out");
      navigate("/login");
      // console.log("");
    } catch (error) {
      // console.error("Error logging out:", error);
    }
  };
  return (
    <header className="fixed top-0 w-full flex justify-between z-[6000] border-b border-slate-700 shadow-md bg-black text-white p-5 px-10 items-center">
      {user ? (
        <Link
          to={"/"}
          className=" font-bold text-green-700 relative -left-5 top-1 text-lg md:text-2xl"
        >
          Reckon-Enterprise
        </Link>
      ) : (
        <Link
          to={"/login"}
          className=" font-bold text-green-700 relative -left-5 top-1 text-lg md:text-2xl"
        >
          Reckon-Enterprise
        </Link>
      )}
      {/* <div className="socials flex items-center gap-3">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
        </div> */}
      <nav>
        <button
          onClick={() => {
            setToggle((prev) => !prev);
            console.log("Logging...", toggle);
          }}
          className=" absolute text-green-700 md:hidden inline-block top-6 text-2xl right-8"
        >
          <FaBars />
        </button>

        {user && (
          <motion.ul
            className={
              toggle == false
                ? " animate__animated animate__fadeInDown hidden md:flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute right-0 top-16 md:top-0 md:right-0 md:w-full py-4  bg-slate-950 md:bg-transparent md:py-0 w-60 gap-10 items-center"
                : " animate__animated animate__fadeInDown flex md:flex-nowrap flex-wrap md:flex-row flex-col md:relative absolute right-0 top-16 md:top-0 md:right-0 md:w-full py-4 rounded-lg  bg-slate-950 md:bg-transparent md:py-0 w-60 gap-10 items-center"
            }
          >
            {user && (
              <li>
                <Link
                  to={"/"}
                  className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
                >
                  {user.email.substring(0, 4) + `...`}{" "}
                  <FaUser className=" text-3xl text-blue-200 border rounded-full p-1" />
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/"}
                className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
              >
                Home <FaHome className=" text-blue-200 text-sm" />
              </Link>
            </li>
            {user && isAdmin === true && (
              <>
                <li>
                  <Link
                    to={"/addproduct"}
                    className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
                  >
                    Upload <FaUpload className=" text-blue-200 text-sm" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin"}
                    className="transition-border-t h-10 text-white  duration-500 ease font-bold items-center hover:hover:border-t-2 border-t-blue-400  p-2 text-sm flex gap-2"
                  >
                    swapps <FaExchangeAlt className=" text-blue-200 text-sm" />
                  </Link>
                </li>
              </>
            )}
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
            {user && (
              <li>
                <Link
                  onClick={handleLogout}
                  className="transition-border-width bg-red-800 rounded-md text-white duration-500 ease font-medium items-center hover:border-t-2 hover:border-blue-500 p-2 text-sm flex gap-2"
                >
                  Logout <FaSignOutAlt className=" text-blue-200 text-sm" />
                </Link>
              </li>
            )}
          </motion.ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
