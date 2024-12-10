import { Paper, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BloodBankCard = ({ name, hospitalName, phoneNumber, email, address, city, state, latitude, longitude, onEdit, onDelete }) => {
  return (
    <Paper sx={{ padding: 2, marginBottom: 2, position: "relative" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      <Typography variant="body1">
        <strong>Hospital Name:</strong> {hospitalName || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>Phone:</strong> {phoneNumber || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {email || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong> {address || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>City:</strong> {city || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>State:</strong> {state || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> Lat: {latitude}, Long: {longitude}
      </Typography>

      {/* Action Icons */}
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton color="primary" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default BloodBankCard;
