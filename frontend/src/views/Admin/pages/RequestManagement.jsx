import { useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const requestsData = [
  { id: 1, name: 'John Doe', bloodType: 'A+', date: '2024-11-01', status: 'Pending' },
  { id: 2, name: 'Jane Smith', bloodType: 'O-', date: '2024-11-05', status: 'Approved' },
  { id: 3, name: 'Chris Johnson', bloodType: 'B+', date: '2024-11-10', status: 'Rejected' },
  { id: 4, name: 'Emily Davis', bloodType: 'AB+', date: '2024-11-15', status: 'Pending' },
];

const RequestManagement = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchText, setSearchText] = useState('');

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredRequests = requestsData.filter((request) => {
    return (
      (filterStatus === 'All' || request.status === filterStatus) &&
      (request.name.toLowerCase().includes(searchText.toLowerCase()) || String(request.id).includes(searchText))
    );
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Request & Approval Management
      </Typography>

      {/* Overview Section */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <Card sx={{ flex: 1, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">Total Requests</Typography>
            <Typography variant="h4" color="primary">50</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, backgroundColor: '#e3f2fd', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">Pending Requests</Typography>
            <Typography variant="h4" color="error">10</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, backgroundColor: '#e8f5e9', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">Approved Requests</Typography>
            <Typography variant="h4" color="success">30</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, backgroundColor: '#ffebee', textAlign: 'center' }}>
          <CardContent>
            <Typography variant="h6">Rejected Requests</Typography>
            <Typography variant="h4" color="warning">10</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Filters Section */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} onChange={handleStatusChange} label="Status">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search by Name or ID"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          fullWidth
        />
      </Box>

      {/* Requests Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Blood Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.bloodType}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<DoneIcon />}
                        sx={{ marginRight: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<ClearIcon />}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestManagement;
