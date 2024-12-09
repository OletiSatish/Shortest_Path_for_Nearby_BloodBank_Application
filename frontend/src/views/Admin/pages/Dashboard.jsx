import { Box, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneIcon from "@mui/icons-material/Done";

// Chart components
import LineChartComponent from "../../../components/Admin/charts/LineChartComponent";
import BarChartComponent from "../../../components/Admin/charts/BarChartComponent";
import AreaChartComponent from "../../../components/Admin/charts/AreaChartComponent";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: 4,
          justifyContent: "space-between",
        }}
      >
        {/* Total User Registrations */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total User Registrations
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                3,000
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Blood Banks */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <BusinessIcon color="secondary" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Blood Banks
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                50
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Blood Inventory */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <InventoryIcon color="success" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Blood Inventory
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                5,000 Units
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Requests Received */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <AssignmentIcon color="error" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Requests Received
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                1,200
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Requests Fulfilled */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <DoneIcon color="info" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Requests Fulfilled
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                1,000
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Card sx={{ flex: "1 1 48%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Requests Fulfilled (Monthly Overview)
            </Typography>
            <LineChartComponent />
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 48%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Blood Inventory Stock (Monthly Overview)
            </Typography>
            <BarChartComponent />
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 48%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              User Growth (Area Chart)
            </Typography>
            <AreaChartComponent />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
