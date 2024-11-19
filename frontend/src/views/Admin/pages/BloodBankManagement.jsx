import  { useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';

const BloodBankManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bloodBanks = [
    { id: 1, name: 'City Blood Bank', location: 'New York' },
    { id: 2, name: 'Health Care Blood Bank', location: 'Los Angeles' },
    { id: 3, name: 'National Blood Center', location: 'Chicago' },
  ];

  const filteredBloodBanks = bloodBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Blood Bank Management</Typography>

      {/* Search Box and Add Button */}
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <TextField
          label="Search Blood Bank"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" sx={{ marginBottom: 2 }}>
          Add New Blood Bank
        </Button>
      </Paper>

      {/* List of Blood Banks */}
      <Box>
        {filteredBloodBanks.map((bank) => (
          <Paper key={bank.id} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{bank.name}</Typography>
            <Typography variant="body1">{bank.location}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default BloodBankManagement;
