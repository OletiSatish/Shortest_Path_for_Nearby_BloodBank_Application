import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;
