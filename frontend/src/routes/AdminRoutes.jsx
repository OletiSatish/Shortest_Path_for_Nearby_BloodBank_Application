import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSidebar from "../Layouts/AdminSidebar"

function AdminRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminSidebar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AdminRoutes;
