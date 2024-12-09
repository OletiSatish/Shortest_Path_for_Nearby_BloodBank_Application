import { Box, Typography, Button } from "@mui/material";

const ScheduleEvents = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Schedule Events
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Plan and manage blood donation events to ensure a steady supply of blood units.
      </Typography>
      <Button variant="contained" color="primary">
        Add New Event
      </Button>
    </Box>
  );
};

export default ScheduleEvents;
