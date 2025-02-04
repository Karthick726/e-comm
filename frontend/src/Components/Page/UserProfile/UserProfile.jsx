import React, { useState, useEffect } from "react";
import Header from "../../Common/Layout/Header/Header";
import client from "../../Common/Client/Client";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/userSlice";
import { FaUserCircle, FaBoxOpen } from 'react-icons/fa';
import profile from '../../../Assets/Images/profile.png'

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  console.log("user", user);

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
    </ul>
  </aside>

  {/* Main Content */}
  <main className="user-content" style={{ backgroundColor: "#fff" }}>
    {activeTab === "profile" && <UpdateProfile />}
    {activeTab === "orders" && (
      <div>
        <h2>Your Orders</h2>
        <p>View your past orders here.</p>
      </div>
    )}
  </main>
</div>
    </div>
  );
};

export default UserProfile;
