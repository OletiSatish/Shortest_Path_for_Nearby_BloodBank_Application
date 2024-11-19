import { Box, Paper, Typography, Button, Card, CardContent } from '@mui/material';
import { BarChart as BarChartIcon, Event as EventIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { Chart } from 'react-chartjs-2'; // Chart.js for charts (install chart.js and react-chartjs-2)
import { createTheme } from '@mui/material/styles';

const BloodBankDashboard = () => {
  const theme = createTheme();

  // Sample data for the charts
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blood Donated (in Liters)',
        data: [50, 70, 90, 60, 80, 100],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blood Bank Dashboard
      </Typography>

      {/* Cards Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {/* Card for Donor Count */}
        <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <Box>
            <Typography variant="h6">Total Donors</Typography>
            <Typography variant="h4">1200</Typography>
          </Box>
          <PersonAddIcon color="primary" fontSize="large" />
        </Paper>

        {/* Card for Inventory */}
        <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <Box>
            <Typography variant="h6">Blood Inventory</Typography>
            <Typography variant="h4">1500 Liters</Typography>
          </Box>
          <BarChartIcon color="secondary" fontSize="large" />
        </Paper>

        {/* Card for Expired Stock */}
        <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <Box>
            <Typography variant="h6">Expired Blood Stock</Typography>
            <Typography variant="h4">50 Liters</Typography>
          </Box>
          <EventIcon color="error" fontSize="large" />
        </Paper>

        {/* Card for Upcoming Events */}
        <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
          <Box>
            <Typography variant="h6">Upcoming Events</Typography>
            <Typography variant="h4">5</Typography>
          </Box>
          <EventIcon color="primary" fontSize="large" />
        </Paper>
      </Box>

      {/* Blood Donation Chart */}
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Blood Donation Trend
          </Typography>
          <Box sx={{ position: 'relative', height:400, width: '100%' }}>
            <Chart type="line" data={chartData} options={chartOptions} />
          </Box>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} fullWidth>
              Add Donor
            </Button>
            <Button variant="contained" color="secondary" startIcon={<EventIcon />} fullWidth>
              Schedule Event
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BloodBankDashboard;
