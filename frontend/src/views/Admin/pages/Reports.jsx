import { Box, Typography, Card, CardContent } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components, including CategoryScale
ChartJS.register(
  CategoryScale,    // Register the CategoryScale (required for category-based x-axis)
  LinearScale,      // Register the LinearScale (required for y-axis)
  BarElement,       // Register the BarElement (required for Bar charts)
  Title,            // Register the Title plugin
  Tooltip,          // Register the Tooltip plugin
  Legend            // Register the Legend plugin
);

const Reports = () => {
  const reportData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Blood Donations (Units)',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Blood Donations Over Time',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {/* Card for the Chart */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Blood Donations Report
          </Typography>
          <Bar data={reportData} options={options} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;
