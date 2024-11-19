import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BloodbankSidebar from "../Layouts/BloodBankSidebar";
function BloodbankRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/bloodbank" element={<BloodbankSidebar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default BloodbankRoutes;
