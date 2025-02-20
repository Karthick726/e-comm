import React, { useEffect } from 'react'
import Header from '../../Common/Layout/Header/Header'
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CheckoutDetails from './CheckoutDetails';

const CheckOut = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const { userCarts } = location.state || {};

 console.log("userCarts",userCarts)
    useEffect(()=>{
         const token = Cookies.get("token");
            if (token === undefined) {
              navigate("/account");
            } 
    },[])
  return (
    <div>
        <Header/>
        <CheckoutDetails userCarts={userCarts} />
    </div>
  )
}

export default CheckOut