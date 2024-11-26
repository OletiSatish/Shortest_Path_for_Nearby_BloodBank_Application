import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Inventory as InventoryIcon,
  PendingActions as PendingActionsIcon,
  History as HistoryIcon,
  ListAlt as ListAltIcon,
  Event as EventIcon,
  Group as GroupIcon,
  NotificationImportant as NotificationImportantIcon,
  Feedback as FeedbackIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import SevereColdIcon from '@mui/icons-material/SevereCold';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Typography } from "@mui/material";

// Updated Navigation Configuration
const NAVIGATION = [
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "inventory", title: "Blood Inventory", icon: <InventoryIcon /> },
  { segment: "emergency-requests", title: "Emergency Requests", icon: <PendingActionsIcon /> },
  { segment: "donors", title: "Manage Donors", icon: <GroupIcon /> },
  { segment: "events", title: "Schedule Events", icon: <EventIcon /> },
  { segment: "requests", title: "Request Management", icon: <ListAltIcon /> },
  { segment: "notifications", title: "Notifications", icon: <NotificationImportantIcon /> },
  { segment: "reports", title: "Reports & Analytics", icon: <BarChartIcon /> },
  { segment: "feedback", title: "Feedback & Complaints", icon: <FeedbackIcon /> },
  { segment: "expired-stock", title: "Expired Blood Stock", icon: <SevereColdIcon /> },
  { segment: "navigation", title: "Shortest Path & Navigation", icon: <ExploreIcon /> },
  { segment: "history", title: "Transaction History", icon: <HistoryIcon /> },
];

// Importing pages
import Inventory from "../views/Bloodbank/pages/Inventory";
import RequestManagement from "../views/Bloodbank/pages/RequestManagement";
import BloodBankDashboard from "../views/Bloodbank/pages/BloodBankDashboard";
import ManageDonors from "../views/Bloodbank/pages/ManageDonors";
import ScheduleEvents from "../views/Bloodbank/pages/ScheduleEvents";
import ReportsAndAnalytics from "../views/Bloodbank/pages/ReportsAndAnalytics";
import ExpiredStock from "../views/Bloodbank/pages/ExpiredStock";
import EmergencyRequests from "../views/Bloodbank/pages/EmergencyRequests";
import Feedback from "../views/Bloodbank/pages/Feedback";
import Notifications from "../views/Bloodbank/pages/Notifications";
import ShortestPathNavigation from "../views/Bloodbank/pages/ShortestPathNavigation";
import History from "../views/Bloodbank/pages/History";

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

  const contextWindow = window !== undefined ? window() : undefined;

  const renderPage = () => {
    switch (pathname) {
      case "/dashboard":
        return <BloodBankDashboard />;
      case "/inventory":
        return <Inventory />;
      case "/emergency-requests":
        return <EmergencyRequests />;
      case "/donors":
        return <ManageDonors />;
      case "/events":
        return <ScheduleEvents />;
      case "/requests":
        return <RequestManagement />;
      case "/notifications":
        return <Notifications />;
      case "/reports":
        return <ReportsAndAnalytics />;
      case "/feedback":
        return <Feedback />;
      case "/expired-stock":
        return <ExpiredStock />;
      case "/navigation":
        return <ShortestPathNavigation />;
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
      session={null}
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
