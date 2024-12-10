import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import BloodbankSidebar from "../Layouts/BloodBankSidebar";
import BloodBankDashboard from "../views/Bloodbank/pages/BloodBankDashboard";
import Inventory from "../views/Bloodbank/pages/Inventory";
import EmergencyRequests from "../views/Bloodbank/pages/EmergencyRequests";
import ManageDonors from "../views/Bloodbank/pages/ManageDonors";
import ScheduleEvents from "../views/Bloodbank/pages/ScheduleEvents";
import RequestManagement from "../views/Bloodbank/pages/RequestManagement";
import ReportsAndAnalytics from "../views/Bloodbank/pages/ReportsAndAnalytics";
import ExpiredStock from "../views/Bloodbank/pages/ExpiredStock";
import Notifications from "../views/Bloodbank/pages/Notifications";
import ShortestPathNavigation from "../views/Bloodbank/pages/ShortestPathNavigation";
import Feedback from "../views/Bloodbank/pages/Feedback";
import History from "../views/Bloodbank/pages/History";

function BloodbankLayout() {
  return (
    <BloodbankSidebar>
      <Outlet />
    </BloodbankSidebar>
  );
}

function BloodbankRoutes() {
  return (
    <Routes>
      {/* Bloodbank routes base layout */}
      <Route path="/*" element={<BloodbankLayout />}>
        <Route path="dashboard" element={<BloodBankDashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="emergency-requests" element={<EmergencyRequests />} />
        <Route path="donors" element={<ManageDonors />} />
        <Route path="events" element={<ScheduleEvents />} />
        <Route path="requests" element={<RequestManagement />} />
        <Route path="reports" element={<ReportsAndAnalytics />} />
        <Route path="expired-stock" element={<ExpiredStock />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="navigation" element={<ShortestPathNavigation />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default BloodbankRoutes;
