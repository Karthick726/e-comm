import React, { createContext, useState } from "react";


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}