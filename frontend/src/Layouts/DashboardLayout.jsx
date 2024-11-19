import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

// Styled components
const MainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : 0,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const SidebarContainer = styled(Box)(({ theme, open }) => ({
  width: open ? drawerWidth : 0,
  flexShrink: 0,
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    width: 0,
  },
}));

// Main Dashboard Layout Component
const DashboardLayout = ({ children, Sidebar, branding }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBarStyled position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {branding.title || "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBarStyled>

      {/* Sidebar */}
      <SidebarContainer
        component="nav"
        sx={{ display: isMobile && !sidebarOpen ? "none" : "block" }}
        open={sidebarOpen}
      >
        <Sidebar onToggle={handleSidebarToggle} />
      </SidebarContainer>

      {/* Main Content */}
      <MainContent open={sidebarOpen}>
        <Toolbar />
        {children}
      </MainContent>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired, // Main content passed as children
  Sidebar: PropTypes.elementType.isRequired, // Sidebar component passed dynamically
  branding: PropTypes.shape({
    title: PropTypes.string,
  }),
};

DashboardLayout.defaultProps = {
  branding: {
    title: "Dashboard",
  },
};

export default DashboardLayout;
