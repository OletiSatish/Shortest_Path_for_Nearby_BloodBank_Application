import { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Card, CardContent } from '@mui/material';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([
    { id: 1, title: 'Blood Donation Drive - New York', date: '2024-12-05', location: 'New York City' },
    { id: 2, title: 'Blood Donation Drive - Los Angeles', date: '2024-12-12', location: 'Los Angeles' },
    { id: 3, title: 'Blood Donation Drive - Chicago', date: '2024-12-19', location: 'Chicago' },
  ]);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Events Management</Typography>

      {/* Search Box */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <TextField
          label="Search Events"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" sx={{ marginBottom: 2 }}>
          Add New Event
        </Button>
      </Paper>

      {/* Event List */}
      <Box>
        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ padding: 2, marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{event.title}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>Date: {event.date}</Typography>
              <Typography variant="body1">Location: {event.location}</Typography>
              <Button variant="outlined" sx={{ marginTop: 2 }}>
                Edit Event
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Events;
