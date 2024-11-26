import  { useState } from "react";
import { Box, Typography, TextField, Button, Paper, CircularProgress } from "@mui/material";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

// Replace with your own Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const ShortestPathNavigation = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (origin && destination) {
      setLoading(true);
      const directionsService = new window.google.maps.DirectionsService();
      try {
        const results = await directionsService.route({
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirections(results);
      } catch (error) {
        console.error("Error fetching directions", error);
      }
      setLoading(false);
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shortest Path Navigation
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" color="primary">
            Get the shortest path between two locations.
          </Typography>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
            <TextField
              label="Origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
            <TextField
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Find Shortest Path"}
            </Button>
          </Box>
        </Paper>

        {directions && (
          <Box sx={{ mt: 3, height: "500px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={{ lat: directions.routes[0].legs[0].start_location.lat(), lng: directions.routes[0].legs[0].start_location.lng() }}
              zoom={14}
            >
              <DirectionsRenderer directions={directions} />
            </GoogleMap>
          </Box>
        )}
      </Box>
    </LoadScript>
  );
};

export default ShortestPathNavigation;
