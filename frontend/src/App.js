import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'

import Spinner from "./Components/Common/Loader/Loader";
import ScrollTop from "./Components/Common/ScrollTop";
import ScrollBar from "./Components/Common/framer/Scrollbar";

import {  UserProvider } from "./Components/Page/Home/UserLogin/UserContext";


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
          path="/login"
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
