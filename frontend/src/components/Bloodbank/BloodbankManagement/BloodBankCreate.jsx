import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const BloodBankCreate = ({ onClose }) => {
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newBloodBank = {
      name,
      hospitalName,
      email,
      address,
      city,
      state,
      phoneNumber,
      location: {
        latitude,
        longitude,
      },
    };

    try {
      await axios.post("http://localhost:8000/api/bloodbank/create", newBloodBank);
      onClose(); // Close the dialog after successful creation
    } catch (error) {
      console.error("Error creating blood bank:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Hospital Name"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
        sx={{
          backgroundColor: "#1976d2",
          padding: "10px 30px",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        {loading ? "Creating..." : "Create Blood Bank"}
      </Button>
    </Box>
  );
};

export default BloodBankCreate;
