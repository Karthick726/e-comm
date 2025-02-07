import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Page/Home/UserLogin/UserContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== role) {
    return <Navigate to="/account" />;
  }

  return children;
};

export default ProtectedRoute;
