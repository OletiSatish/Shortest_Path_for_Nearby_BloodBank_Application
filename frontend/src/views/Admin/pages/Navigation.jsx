import { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Divider } from "@mui/material";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "500px",
  width: "100%",
};

const defaultCenter = {
  lat: 37.7749, // Example: San Francisco latitude
  lng: -122.4194, // Example: San Francisco longitude
};

const Navigation = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);

  const handleFindPath = () => {
    if (!start || !destination) {
      alert("Please enter both start and destination.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          alert("Failed to get directions. Please check your inputs and try again.");
        }
      }
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Shortest Path & Navigation
      </Typography>

      {/* Input Section */}
      <Card sx={{ marginBottom: 3, boxShadow: 3, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Find Shortest Path
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            label="Start Location"
            variant="outlined"
            fullWidth
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <TextField
            label="Destination"
            variant="outlined"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleFindPath}>
            Find Path
          </Button>
        </Box>
      </Card>

      {/* Map Section */}
      <Card sx={{ marginBottom: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Map Visualization
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={10}>
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </CardContent>
      </Card>

      {/* Route Details */}
      {directions && (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Route Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="body1">
              <strong>Start:</strong> {start}
            </Typography>
            <Typography variant="body1">
              <strong>Destination:</strong> {destination}
            </Typography>
            <Typography variant="body1">
              <strong>Distance:</strong>{" "}
              {directions.routes[0].legs[0].distance.text}
            </Typography>
            <Typography variant="body1">
              <strong>Duration:</strong>{" "}
              {directions.routes[0].legs[0].duration.text}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Navigation;
