import { Routes, Route, Outlet } from "react-router-dom";
import UserNavbar from "../Layouts/UserNavbar";
import Home from "../views/User/Home";
import About from "../views/User/About";  // Example for About page

function UserLayout() {
  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  );
}

function UserRoutes() {
  return (
    <Routes>
      {/* User layout wrapping all user routes */}
      <Route path="/*" element={<UserLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        {/* Add other user-specific routes here */}
      </Route>
    </Routes>
  );
}

export default UserRoutes;
