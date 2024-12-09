
import { useState } from 'react';
import { Box, Typography, Paper, TextField, Switch, FormControlLabel, Button } from '@mui/material';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleToggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleToggleNotification = () => setNotificationEnabled(!notificationEnabled);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Settings</Typography>

      {/* General Settings Section */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>General Settings</Typography>

        {/* Dark Mode Switch */}
        <FormControlLabel
          control={<Switch checked={isDarkMode} onChange={handleToggleDarkMode} />}
          label="Enable Dark Mode"
        />

        {/* Notification Settings */}
        <FormControlLabel
          control={<Switch checked={notificationEnabled} onChange={handleToggleNotification} />}
          label="Enable Notifications"
          sx={{ marginTop: 2 }}
        />
      </Paper>

      {/* Account Settings Section */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Account Settings</Typography>

        <TextField
          label="Change Username"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Change Email Address"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Change Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" sx={{ marginTop: 2 }}>
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
};

export default Settings;
