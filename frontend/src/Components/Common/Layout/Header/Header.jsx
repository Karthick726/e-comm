import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { FaSearch, FaUserAlt, FaShoppingCart,FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import client from "../../Client/Client";
import logo from "../../../../Assets/Images/Logo.jpg";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactInfo, setContactInfo] = useState({});
  const location =useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    toast.dismiss();
    try {
      const response = await client.get("/contact/get-contact", { withCredentials: true });
      if (response.status === 200) {
        setContactInfo(response.data[0]);
      }
    } catch (err) {
      toast.error("Failed to fetch contact details");
    }
  };

  const protectHeader=["/login"]

  return (
    <>
      {/* Header Section */}
      <header className={`header container-fluid  ${isSticky ? "sticky" : ""}`}>
        <div className="header-container">
          {/* Logo and Search Bar */}
          <div className="header-left">
            <Link to="/" className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className={`search-bar ${protectHeader.includes(location.pathname) ? "protect" : ""}`}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Menu Toggle and Icons */}
          <div className="header-right">
<div className="protect-header" style={{
  display: 'flex',
  justifyContent: 'space-between',

}}>
  <div>
  <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <TiThMenu />
            </button>

  </div>

            <div>
            <Link to="/" className="logo-containers">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            </div>
</div>
           


         
            <div  className={`header-icons ${protectHeader.includes(location.pathname) ? "protect" : ""}`}>
              <div className="icon-card">
                <Link to="/login">
                  <FaUserAlt className="icon" />
                  <span>Account</span>
                </Link>
              </div>
              <div className="icon-card">
                <Link to="/cart">
                  <FaShoppingCart className="icon" />
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
          <FaTimes />
        </button>
        <ul>
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/products" className="nav-link">Products</NavLink></li>
          <li><NavLink to="/about-us" className="nav-link">About Us</NavLink></li>
          <li><NavLink to="/contact-us" className="nav-link">Contact</NavLink></li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
