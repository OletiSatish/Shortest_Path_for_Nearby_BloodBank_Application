import { Box, Card, CardContent, Typography } from "@mui/material";
import LineChartComponent from "../../../components/Admin/charts/LineChartComponent";
import BarChartComponent from "../../../components/Admin/charts/BarChartComponent";
import PieChartComponent from "../../../components/Admin/charts/PieChartComponent";
import Table  from "../../../components/Admin/Tables/TableComponent"; //

const Reports = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Reports and Analytics
      </Typography>

      {/* Overview Statistics */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4, justifyContent: "space-between" }}>
        {/* Total Blood Requests */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Blood Requests
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                1,200
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Blood Fulfilled */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Total Blood Fulfilled
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                1,000
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Total Requests Pending */}
        <Card sx={{ flex: "1 1 18%", display: "flex", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", paddingTop: 2, paddingBottom: 1, width: "100%" }}>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary", marginBottom: 0.5 }}>
                Pending Requests
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                200
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Charts Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Performance Overview
        </Typography>

        {/* Line Chart for Requests Fulfilled */}
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Requests Fulfilled (Monthly Overview)
            </Typography>
            <LineChartComponent />
          </CardContent>
        </Card>

        {/* Bar Chart for Blood Stock */}
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Blood Inventory Stock
            </Typography>
            <BarChartComponent />
          </CardContent>
        </Card>

        {/* Optional Pie Chart for Blood Type Distribution */}
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Blood Type Distribution
            </Typography>
            <PieChartComponent />
          </CardContent>
        </Card>
      </Box>

      {/* Data Table for Detailed Analytics */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Detailed Request Analysis
        </Typography>
        <Table /> {/* Your custom Table component for data */}
      </Box>
    </Box>
  );
};

export default Reports;
