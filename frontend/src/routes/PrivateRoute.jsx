import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role;

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
