import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const UserManagement = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Mark Lee', email: 'mark@example.com', role: 'Admin', status: 'Active' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>User Management</Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Button variant="contained" sx={{ marginBottom: 2 }}>
          Add New User
        </Button>
        <TextField
          label="Search User"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Paper>

      {/* User Table */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </Box>
    </Box>
  );
};

export default UserManagement;
