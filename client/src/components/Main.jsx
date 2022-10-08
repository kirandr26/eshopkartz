import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/css/react-toastify.css";
import Menu from "./Header/Menu";
import Home from "./Default/Home";
import About from "./Default/About";
import Contact from "./Default/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Pnf from "./Util/Pnf";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import Product from "./Product/Product";
import ProductDetails from "./Product/ProductDetails";
import Cart from "./Product/Cart";
import Checkout from "./Product/Checkout";

function Main() {
  return (
    <BrowserRouter>
      <Menu />
      <ToastContainer autoclose={2000} position={"top-right"} />
      <Routes>
        <Route exact path={`/`} element={<Home />} />
        <Route exact path={`/about`} element={<About />} />
        <Route exact path={`/contact`} element={<Contact />} />
        <Route exact path={`/login`} element={<Login />} />
        <Route exact path={`/register`} element={<Register />} />

        {/* Product route */}
        <Route exact path={`/product`} element={<Product />} />
        <Route
          exact
          path={`/product/details/:id`}
          element={<ProductDetails />}
        />
        <Route exact path={`/cart`} element={<Cart />} />
        <Route exact path={`/checkout`} element={<Checkout />} />

        {/* user route */}
        <Route exact path={`/user/dashboard`} element={<UserDashboard />} />

        {/* admin route */}
        <Route exact path={`/amin/dashboard`} element={<AdminDashboard />} />
        <Route exact path={`/*`} element={<Pnf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
