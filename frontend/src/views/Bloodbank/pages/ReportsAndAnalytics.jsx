import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import BloodtypeIcon from "@mui/icons-material/Bloodtype"; // Importing the Bloodtype icon
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ReportsAndAnalytics() {
  // Line Chart Data
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Blood Donations",
        data: [150, 200, 180, 220, 250, 300], // Blood donations per month
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"],
    datasets: [
      {
        label: "Units Available",
        data: [120, 150, 80, 50, 60, 70, 30, 20],
        backgroundColor: [
          "#1976d2",
          "#2196f3",
          "#4caf50",
          "#ff9800",
          "#9c27b0",
          "#e91e63",
          "#ff5722",
          "#607d8b",
        ],
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  // Pie Chart Options
  const pieOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Calculate Total Donations (sum of all monthly donations)
  const totalDonations = lineData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0
  );

  return (
    <Box
      sx={{
        padding: "40px", // Add consistent padding to the entire container backgroundColor: "#fff",
        margin: "20px",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 4, color: "#1976d2" }}
      >
        Reports and Analytics
      </Typography>

      {/* Top Row: Total Donations Card and Line Chart */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "space-between",
        }}
      >
        {/* Total Donations Summary */}
        <Box sx={{ flexBasis: "48%", minWidth: 300 }}>
          <Card
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              Total Donations Till Now
            </Typography>
            <BloodtypeIcon
              sx={{ fontSize: 240, color: "#d32f2f", mb: 3, mt: 2 }}
            />
            <Divider sx={{ marginBottom: 2, width: "80%" }} />
            <Typography
              variant="h6"
              align="center"
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              {totalDonations} Donations
            </Typography>
          </Card>
        </Box>

        {/* Line Chart */}
        <Box sx={{ flexBasis: "48%", minWidth: 300 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Monthly Blood Donations
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Line data={lineData} />
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Bottom Row: Bar Chart and Pie Chart */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        {/* Bar Chart */}
        <Box sx={{ flexBasis: "48%", minWidth: 300 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Blood Inventory Levels
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Bar data={barData} />
            </CardContent>
          </Card>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ flexBasis: "48%", minWidth: 300 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Request Status Breakdown
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Box
                sx={{
                  position: "relative",
                  width: "350px", // Set a fixed width for the chart
                  height: "300px", // Set a fixed height for the chart
                  margin: "0 auto", // Center the chart horizontally
                }}
              >
                <Pie data={pieData} options={pieOptions} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsAndAnalytics;
