import { useContext } from "react";
import { UserContext } from "../Home/UserLogin/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "./Common/Layout/Header/Header";

const AdminDashboard = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/account");
  };

  return (
    <div>
    <Header/>
    </div>
  );
};

export default AdminDashboard;
