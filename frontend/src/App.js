import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'

import Spinner from "./Components/Common/Loader/Loader";
import ScrollTop from "./Components/Common/ScrollTop";
import ScrollBar from "./Components/Common/framer/Scrollbar";

import {  UserProvider } from "./Components/Page/Home/UserLogin/UserContext";
import { ForgetPassword } from "./Components/Page/Home/UserLogin/ForgetPassword";
import ResetPassword from "./Components/Page/Home/UserLogin/ResetPassword";
import AdminDashboard from "./Components/Page/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Products from "./Components/Page/AdminDashboard/Pages/Products";
import Contact from "./Components/Page/AdminDashboard/Pages/Contact";
import { Product } from "./Components/Page/Products/Product";


const Home = lazy(() => import("./Components/Page/Home/Home"));
const NotFound = lazy(() => import("./Components/Common/NotFound/NotFound"));
const Userlogin = lazy(() => import("./Components/Page/Home/UserLogin/Userlogin"));
const Otp = lazy(() => import("./Components/Page/Home/UserLogin/Otp"));

function App() {
 

 

  return (
         <BrowserRouter>
      <Toaster
        toastOptions={{
          success: {
            style: {
              duration: 3000,
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              duration: 3000,
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <ScrollTop />
      <ScrollBar />
<UserProvider>


      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <Product />
            </Suspense>
          }
        />
          <Route
          path="/account"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <Userlogin />
            </Suspense>
          }
        />
        <Route
          path="/user/otp"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <Otp />
            </Suspense>
          }
        />
          <Route
          path="/user/forgetpassword"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <ForgetPassword />
            </Suspense>
          }
        />
        <Route
        path="/reset-password/:token"
        element={
          <Suspense fallback={<Spinner open={true} />}>
            <ResetPassword />
          </Suspense>
          }
          />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/service-add" element={<ProtectedRoute role="admin"><Products /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute role="admin"><Contact /></ProtectedRoute>} />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner open={true} />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
