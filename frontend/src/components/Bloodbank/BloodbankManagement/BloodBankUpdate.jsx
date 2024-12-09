import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import axios from "axios";

const BloodBankUpdate = ({ bloodBank, onClose }) => {
  const [formData, setFormData] = useState({
    name: bloodBank.name || "",
    hospitalName: bloodBank.hospitalName || "",
    phoneNumber: bloodBank.phoneNumber || "",
    email: bloodBank.email || "",
    address: bloodBank.address || "",
    city: bloodBank.city || "",
    state: bloodBank.state || "",
    latitude: bloodBank.location?.latitude || "",
    longitude: bloodBank.location?.longitude || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/bloodbank/${bloodBank._id}`, formData);
      onClose(true); // Refresh list and close dialog
    } catch (error) {
      console.error("Error updating blood bank:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Blood Bank Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Hospital Name"
        name="hospitalName"
        value={formData.hospitalName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Latitude"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Longitude"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button onClick={() => onClose(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </Box>
    </Box>
  );
};

export default BloodBankUpdate;
