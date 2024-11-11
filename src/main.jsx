import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Body from "./Components/Body.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import Contact from "./Components/Contact.jsx";
import PhoneSwappingPage from "./Components/Swap.jsx";
import SwapOne from "./Components/Swapone.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import AdminRoute from "./Components/AdminRoute.jsx";
import AdminSwapRequests from "./Components/Admin.jsx";
import NotAuthorized from "./Components/Not-Authorized.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" index={true} element={<Body />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/swap/:id" element={<SwapOne />}></Route>
        <Route path="/swap" element={<PhoneSwappingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/not-authorized" element={<NotAuthorized />}></Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminSwapRequests />
            </AdminRoute>
          }
        ></Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/product/:id" element={<PhoneSwappingPage />}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
