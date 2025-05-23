import React, { useState, useEffect, useContext } from "react";
import Header from "../../Common/Layout/Header/Header";
import client from "../../Common/Client/Client";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/userSlice";
import { FaUserCircle, FaBoxOpen } from 'react-icons/fa';
import profile from '../../../Assets/Images/profile.png'
import { UserContext } from "../Home/UserLogin/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Orders from "./Orders";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");
const { userDetails,logout } = useContext(UserContext);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("user", user);

  useEffect(() => {
    if (userDetails?.role === "admin") {
      navigate("/admin");
    }else if(userDetails?.role==="null"){
      window.location.reload();
    }
  }, [userDetails, navigate]);


  const handleLogout = () => {
    console.log("hii")
    logout();
  
    navigate("/");
  };

  return (
 
    <div>
      <Header />
      <div className="user-container" style={{ backgroundColor: "#f0f0f0" }}>
  {/* Sidebar */}
  <aside className="user-sidebar" >
    <div className="sidebar-header">
      <img src={profile} alt="Profile" className="profile-pic" />
      <h2>{user ? `Hello, ${user.username}` : "Loading..."}</h2>
    </div>
    <ul className="io">
      <li
        className={activeTab === "profile" ? "active" : ""}
        onClick={() => setActiveTab("profile")}
      >
        <FaUserCircle  color="blue"/> Profile Information
      </li>
      <li
        className={activeTab === "orders" ? "active" : ""}
        onClick={() => setActiveTab("orders")}
      >
        <FaBoxOpen color="blue" /> My Orders
      </li>
      <li>
      <Button
          variant="contained"
          color="error"
          style={{
            marginTop: "20px",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span
            style={{
              marginLeft: "5px",
            }}
          >
            Logout
          </span>
        </Button>
      </li>
    </ul>
  </aside>

  {/* Main Content */}
  <main className="user-content" style={{ backgroundColor: "#fff" }}>
    {activeTab === "profile" && <UpdateProfile />}
    {activeTab === "orders" && (
     <Orders/>
    )}
     
  </main>
</div>
    </div>
  );
};

export default UserProfile;
