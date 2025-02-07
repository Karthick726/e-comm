import React, { Fragment, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { UserContext } from "../../../../Home/UserLogin/UserContext";

const Sidebar = ({ open, toggleSidebar, setAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
    const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  return (
    <Fragment>
      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active" : "collapsed"}`}
              to="/admin"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/service-add")  ? "active" : "collapsed"
              }`}
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
             <i class="bi bi-door-open"></i>
              <span>Products</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >

              <li>
                <Link
                  to="/service-add"
                  className={`${isActive("/service-add") ? "active" : ""}`}
                >
                  <i className="bi bi-circle" />
                  <span>Add Products</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-heading">Manage</li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/service") ? "active" : "collapsed"
              }`}
              to="/manage/service"
            >
              <i class="bi bi-door-open"></i>
              <span>Manage Service</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/booking-details") ? "active" : "collapsed"
              }`}
              to="/manage/booking-details"
            >
              <i class="bi bi-calendar-check"></i>
              <span>Booking Details</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/user-contact") ? "active" : "collapsed"
              }`}
              to="/manage/user-contact"
            >
              <i class="bi bi-person-circle"></i>
              <span>User Contact</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/admin/contact") ? "active" : "collapsed"
              }`}
              to="/admin/contact"
            >
              <i class="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>
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
      </aside>
      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
