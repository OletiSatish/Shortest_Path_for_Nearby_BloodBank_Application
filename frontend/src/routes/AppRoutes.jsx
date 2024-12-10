import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import BloodbankRoutes from "./BloodbankRoutes";
import UserRoutes from "./UserRoutes";
import Login from "../components/Auth/Login";
import Unauthorized from "../views/Unauthorized";
import NotFound from "../views/NotFound";
import Register from "../components/Auth/Register";
import ForgotPassword from "../components/Auth/ForgotPassword";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => (
  <Routes>
    {/* Redirect / to /login */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* Role-based private routes */}
    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Route>
    <Route element={<PrivateRoute allowedRoles={["bloodbank"]} />}>
      <Route path="/bloodbank/*" element={<BloodbankRoutes />} />
      
    </Route>
    <Route element={<PrivateRoute allowedRoles={["user"]} />}>
      <Route path="/user/*" element={<UserRoutes />} />
    </Route>

    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
