import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  // Sample chart data for demonstration
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Blood Donations',
        data: [30, 40, 45, 50, 60],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Dashboard</Typography>

      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, marginBottom: 4 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Blood Donors</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,500</Typography>
            <CircularProgress variant="determinate" value={75} sx={{ marginTop: 2 }} />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Blood Inventory</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>1,200 Units</Typography>
            <CircularProgress variant="determinate" value={80} sx={{ marginTop: 2 }} />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Blood Requests Fulfilled</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>90%</Typography>
            <CircularProgress variant="determinate" value={90} sx={{ marginTop: 2 }} />
          </CardContent>
        </Card>
      </Box>

      {/* Donation Trend Chart */}
      <Card sx={{ padding: 2 }}>
        <CardContent>
          <Typography variant="h6">Blood Donation Trend</Typography>
          <Line data={data} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
