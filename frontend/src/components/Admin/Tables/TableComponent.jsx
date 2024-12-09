import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { id: 1, requestId: 'REQ001', user: 'John Doe', bloodType: 'O+', status: 'Fulfilled', date: '2024-11-15' },
  { id: 2, requestId: 'REQ002', user: 'Jane Smith', bloodType: 'A-', status: 'Pending', date: '2024-11-16' },
  { id: 3, requestId: 'REQ003', user: 'Mark Johnson', bloodType: 'B+', status: 'Fulfilled', date: '2024-11-17' },
];

const TableComponent = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Blood Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.requestId}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.bloodType}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
