import React, { createContext, useEffect, useState } from "react";

import Cookies from 'js-cookie'

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
     const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });


  console.log(userData)

  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };


  useEffect(()=>{
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    console.log("tokenss and user", token, role)

    if (token && role) {
      setUser({ token, role });
    }else if(token === "undefined" || role ==="undefined"){
      window.location.reload();
    }

  },[])


  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setUser(null);
  };


  return (
    <UserContext.Provider value={{ userData, updateUserData, user, setUser, logout,userDetails:user }}>
      {children}
    </UserContext.Provider>
  );
}