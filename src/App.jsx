import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from './Components/Header'
import { Outlet } from 'react-router';
import Footer from './Components/Footer';

function App() {
  const [toggle, setToggle] = useState(false);

  const changeState = () => {
    if(toggle === true) {
      setToggle(false)
    }
  }

  return (
    <div onClick={() => { changeState()}}>
      <ToastContainer />

      <header>
        <Header toggle={toggle} setToggle={setToggle}/>
      </header>
      <main className="mt-10">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
