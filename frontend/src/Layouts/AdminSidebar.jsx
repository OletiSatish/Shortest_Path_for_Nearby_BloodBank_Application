import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MapIcon from '@mui/icons-material/Map';
import ApprovalIcon from '@mui/icons-material/Approval';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

// Pages
import Dashboard from "../views/Admin/pages/Dashboard";
import BloodBankManagement from '../views/Admin/pages/BloodBankManagement';
import Reports from '../views/Admin/pages/Reports';
import UserManagement from "../views/Admin/pages/UserManagement";
import Settings from '../views/Admin/pages/Settings';
import Events from '../views/Admin/pages/Events';
import AdminHistory from "../views/Admin/pages/AdminHistory";
import RequestManagement from '../views/Admin/pages/RequestManagement';
import Navigation from '../views/Admin/pages/Navigation';
import Notifications from '../views/Admin/pages/Notifications';
import Feedback from '../views/Admin/pages/Feedback';

// Navigation Configuration
const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'users', title: 'User Management', icon: <GroupIcon /> },
  { segment: 'bloodbanks', title: 'Manage Blood Banks', icon: <ListAltIcon /> },
  { segment: 'events', title: 'Event Management', icon: <EventIcon /> },
  { segment: 'requests', title: 'Request & Approval', icon: <ApprovalIcon /> },
  { segment: 'navigation', title: 'Shortest Path', icon: <MapIcon /> },
  { segment: 'notifications', title: 'Notifications', icon: <NotificationsIcon /> },
  { segment: 'feedback', title: 'Feedback & Complaints', icon: <FeedbackIcon /> },
  { segment: 'reports', title: 'Reports & Analytics', icon: <BarChartIcon /> },
  { segment: 'history', title: 'Admin History', icon: <ListAltIcon /> },
  { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
];

// Theme Configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Page Content Switcher
function DemoPageContent({ pathname }) {
  let pageContent;

  switch (pathname) {
    case '/dashboard':
      pageContent = <Dashboard />;
      break;
    case '/users':
      pageContent = <UserManagement />;
      break;
    case '/bloodbanks':
      pageContent = <BloodBankManagement />;
      break;
    case '/events':
      pageContent = <Events />;
      break;
    case '/requests':
      pageContent = <RequestManagement />;
      break;
    case '/navigation':
      pageContent = <Navigation />;
      break;
    case '/notifications':
      pageContent = <Notifications />;
      break;
    case '/feedback':
      pageContent = <Feedback />;
      break;
    case '/reports':
      pageContent = <Reports />;
      break;
    case '/history':
      pageContent = <AdminHistory />;
      break;
    case '/settings':
      pageContent = <Settings />;
      break;
    default:
      pageContent = (
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Admin Panel Content</Typography>
          <Typography variant="body1">
            Current Page: <strong>{pathname}</strong>
          </Typography>
        </Box>
      );
  }

  return pageContent;
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Admin Sidebar Component
function AdminSidebar(props) {
  const { window } = props;

  // Router State Simulation
  const [pathname, setPathname] = React.useState('/dashboard');

  // Handle Navigation
  const handleNavigation = (path) => {
    setPathname(path);
  };

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: handleNavigation,
    };
  }, [pathname]);

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Admin Panel",
      }}
      router={router}
      theme={demoTheme}
      window={container}
    >
      <DashboardLayout defaultSidebarCollapsed={false}>
        {/* <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Current Path: {pathname}</Typography>
        </Box> */}
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

AdminSidebar.propTypes = {
  window: PropTypes.func,
};

export default AdminSidebar;
