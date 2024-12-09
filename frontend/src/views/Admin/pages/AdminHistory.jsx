import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdminHistory() {
  // Mock Data for Activity Logs
  const historyData = [
    {
      id: 1,
      date: '2024-11-25',
      action: 'Approved a blood request',
      details: 'Request ID: BR1234, Blood Group: A+',
    },
    {
      id: 2,
      date: '2024-11-24',
      action: 'Added a new blood bank',
      details: 'Blood Bank: City Hospital Blood Center',
    },
    {
      id: 3,
      date: '2024-11-23',
      action: 'Resolved a complaint',
      details: 'Complaint ID: CMP5678, Status: Resolved',
    },
    {
      id: 4,
      date: '2024-11-22',
      action: 'Sent notification',
      details: 'Notification: Blood donation camp on Nov 30',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin History
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>
        View your recent activities and logs in the system.
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Admin History Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
              <TableCell><strong>Details</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.action}</TableCell>
                <TableCell>{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminHistory;
