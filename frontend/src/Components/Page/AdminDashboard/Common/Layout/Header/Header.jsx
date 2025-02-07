import React,{Fragment,useContext,useEffect,useState} from "react";
import logo from "../../../../../../Assets/Images/Logo.jpg";
import "./Header.css";
import { Link,useLocation, useNavigate  } from "react-router-dom";


import Sidebar from "../Sidebar/Siderbar";
import admin from "../../../../../../Assets/Images/profile-img.jpg"
import { UserContext } from "../../../../Home/UserLogin/UserContext";
import { useSelector } from "react-redux";

const Header = (props) => {
  const [username, setUsername] = React.useState("");
  const { setAdmin } = props;
  const [openSidebar,setOpenSideBar]= useState(false)
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  

 useEffect(()=>{
  if(user){
    setUsername(user.username)
    }

 },[user])

 console.log("username",user)
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/account");
  };




  const toggleSidebar=()=>{
    setOpenSideBar(!openSidebar)
  }
  return (
    <Fragment>
    
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src={logo} alt="logo" />
            <span className="d-none d-lg-block">Shop Cart</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn show" onClick={toggleSidebar} />
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={admin}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span
                  className="d-none d-md-block dropdown-toggle ps-2"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {username}
                </span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6
                    style={{
                      textTransform: "capitalize",
                      color:"white"
                    }}
                  >
                    {username}
                  </h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
            
               

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout}
                    to="#"
                  >
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} setAdmin={setAdmin} />
     
    </Fragment>
  );
};

export default Header;
