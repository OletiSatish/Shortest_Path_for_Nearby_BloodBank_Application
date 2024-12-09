import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Event as EventIcon,
  Emergency as EmergencyIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  Feedback as FeedbackIcon,
  Map as MapIcon,
  BarChart as BarChartIcon,
  DonutLarge as DonorIcon,
  Delete as ExpiredStockIcon,
} from "@mui/icons-material";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

// Importing BloodBank Pages
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

// Navigation Configuration
const BLOODBANK_NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "inventory", title: "Inventory", icon: <InventoryIcon /> },
  {
    segment: "emergency-requests",
    title: "Emergency Requests",
    icon: <EmergencyIcon />,
  },
  { segment: "donors", title: "Manage Donors", icon: <DonorIcon /> },
  { segment: "events", title: "Event Management", icon: <EventIcon /> },
  { segment: "requests", title: "Request Management", icon: <HistoryIcon /> },
  { segment: "reports", title: "Reports & Analytics", icon: <BarChartIcon /> },
  {
    segment: "expired-stock",
    title: "Expired Stock",
    icon: <ExpiredStockIcon />,
  },
  {
    segment: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon />,
  },
  { segment: "navigation", title: "Shortest Path", icon: <MapIcon /> },
  { segment: "feedback", title: "Feedback", icon: <FeedbackIcon /> },
  { segment: "history", title: "History", icon: <HistoryIcon /> },
];

// Theme Configuration
const bloodbankTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

// Page Content Switcher
function BloodBankPageContent({ pathname }) {
  let pageContent;

  switch (pathname) {
    case "/bloodbank/dashboard":
      pageContent = <BloodBankDashboard />;
      break;
    case "/bloodbank/inventory":
      pageContent = <Inventory />;
      break;
    case "/bloodbank/emergency-requests":
      pageContent = <EmergencyRequests />;
      break;
    case "/bloodbank/donors":
      pageContent = <ManageDonors />;
      break;
    case "/bloodbank/events":
      pageContent = <ScheduleEvents />;
      break;
    case "/bloodbank/requests":
      pageContent = <RequestManagement />;
      break;
    case "/bloodbank/reports":
      pageContent = <ReportsAndAnalytics />;
      break;
    case "/bloodbank/expired-stock":
      pageContent = <ExpiredStock />;
      break;
    case "/bloodbank/notifications":
      pageContent = <Notifications />;
      break;
    case "/bloodbank/navigation":
      pageContent = <ShortestPathNavigation />;
      break;
    case "/bloodbank/feedback":
      pageContent = <Feedback />;
      break;
    case "/bloodbank/history":
      pageContent = <History />;
      break;
    default:
      pageContent = (
        <Box
          sx={{
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Blood Bank Content</Typography>
          <Typography variant="body1">
            Current Page: <strong>{pathname}</strong>
          </Typography>
        </Box>
      );
  }

  return pageContent;
}

BloodBankPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// BloodBank Sidebar Component
function BloodBankSidebar(props) {
  const { window } = props;

  // React Router hook
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // To navigate between routes

  // Handle Navigation
  const handleNavigation = (path) => {
    // Ensure the path does not start with a '/' to avoid double slashes
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    console.log("Navigating to:", `/bloodbank/${cleanPath}`); // Log the full route
    navigate(`/bloodbank/${cleanPath}`); // Update URL with /bloodbank prefix
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppProvider
      navigation={BLOODBANK_NAVIGATION}
      branding={{
        logo: (
          <img src="https://mui.com/static/logo.png" alt="BloodBank logo" />
        ),
        title: "Blood Bank Panel",
      }}
      router={{
        pathname: location.pathname,
        navigate: handleNavigation,
      }}
      theme={bloodbankTheme}
      window={container}
    >
      <DashboardLayout defaultSidebarCollapsed={false}>
        <BloodBankPageContent pathname={location.pathname} />{" "}
        {/* Use the current location */}
      </DashboardLayout>
    </AppProvider>
  );
}

BloodBankSidebar.propTypes = {
  window: PropTypes.func,
};

export default BloodBankSidebar;
