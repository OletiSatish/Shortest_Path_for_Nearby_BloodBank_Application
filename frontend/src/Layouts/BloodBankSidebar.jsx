import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HistoryIcon from "@mui/icons-material/History";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Typography } from "@mui/material";

// Navigation Configuration
const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "inventory", title: "Blood Inventory", icon: <InventoryIcon /> },
  { segment: "donors", title: "Manage Donors", icon: <GroupIcon /> },
  { segment: "events", title: "Schedule Events", icon: <EventIcon /> },
  { segment: "requests", title: "Request Management", icon: <ListAltIcon /> },
  { segment: "reports", title: "Reports & Analytics", icon: <BarChartIcon /> },
  { segment: "expired-stock", title: "Expired Blood Stock", icon: <PendingActionsIcon /> },
  { segment: "history", title: "History", icon: <HistoryIcon /> },
];

// Importing pages
import Inventory from "../views/Bloodbank/pages/inventory";
import RequestManagement from "../views/Bloodbank/pages/RequestManagement";
import BloodBankDashboard from "../views/Bloodbank/pages/BloodBankDashboard";
import ManageDonors from "../views/Bloodbank/pages/ManageDonors";
import ScheduleEvents from "../views/Bloodbank/pages/ScheduleEvents";
import ReportsAndAnalytics from "../views/Bloodbank/pages/ReportsAndAnalytics";
import ExpiredStock from "../views/Bloodbank/pages/ExpiredStock";
import History from "../views/Bloodbank/pages/History";

// Theme Configuration

function BloodbankSidebar(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Optional window context (for iframe or external context support)
  const contextWindow = window !== undefined ? window() : undefined;

  // Render the page based on the pathname
  const renderPage = () => {
    switch (pathname) {
      case "/dashboard":
        return <BloodBankDashboard />;
      case "/inventory":
        return <Inventory />;
      case "/donors":
        return <ManageDonors />;
      case "/events":
        return <ScheduleEvents />;
      case "/requests":
        return <RequestManagement />;
      case "/reports":
        return <ReportsAndAnalytics />;
      case "/expired-stock":
        return <ExpiredStock />;
      case "/history":
        return <History />;
      default:
        return (
          <Box
            sx={{
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Page Not Found</Typography>
          </Box>
        );
    }
  };

  return (
    <AppProvider
      session={null} // No session or authentication state here
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Blood Bank Panel",
      }}
      router={router}
      window={contextWindow}
    >
      <DashboardLayout defaultSidebarCollapsed>{renderPage()}</DashboardLayout>
    </AppProvider>
  );
}

BloodbankSidebar.propTypes = {
  window: PropTypes.func,
};

export default BloodbankSidebar;
