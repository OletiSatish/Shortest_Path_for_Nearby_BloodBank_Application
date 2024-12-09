import { Box, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Chart components
import LineChartComponent from "../../../components/BloodBank/charts/LineChartComponent";
import BarChartComponent from "../../../components/BloodBank/charts/BarChartComponent";
import AreaChartComponent from "../../../components/BloodBank/charts/AreaChartComponent";

const BloodbankDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Blood Bank Dashboard
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
        {/* Total Donors */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Donors
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                3,500
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Blood Units */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <BloodtypeIcon color="secondary" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Blood Units
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                10,000 Units
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Events Organized */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <EventNoteIcon color="success" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Events Organized
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                25
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Blood Requests Fulfilled */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <CheckCircleIcon color="info" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Blood Requests Fulfilled
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                8,500
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
              Blood Units Donation Trends (Monthly Overview)
            </Typography>
            <LineChartComponent />
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 48%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Blood Inventory Distribution (By Blood Type)
            </Typography>
            <BarChartComponent />
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 48%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Donation Events (Yearly Overview)
            </Typography>
            <AreaChartComponent />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BloodbankDashboard;
