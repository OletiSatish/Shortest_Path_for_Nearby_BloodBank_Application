import { Routes, Route, Outlet } from "react-router-dom";
import AdminSidebar from "../Layouts/AdminSidebar";
import Dashboard from "../views/Admin/pages/Dashboard";
import UserManagement from "../views/Admin/pages/UserManagement";
import BloodBankManagement from "../views/Admin/pages/BloodBankManagement";
import Events from "../views/Admin/pages/Events";
import RequestManagement from "../views/Bloodbank/pages/RequestManagement";
import Navigation from "../views/Admin/pages/Navigation";
import Notifications from "../views/Admin/pages/Notifications";
import Feedback from "../views/Admin/pages/Feedback";
import Reports from "../views/Admin/pages/Reports";
import AdminHistory from "../views/Admin/pages/AdminHistory";
import Settings from "../views/Admin/pages/Settings";
function AdminLayout() {
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="bloodbanks" element={<BloodBankManagement />} />
        <Route path="events" element={<Events />} />
        <Route path="requests" element={<RequestManagement />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="reports" element={<Reports />} />
        <Route path="history" element={<AdminHistory />} />
        <Route path="settings" element={<Settings />} />
        
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
