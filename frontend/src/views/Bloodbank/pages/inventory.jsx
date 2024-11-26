import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Inventory() {
  const [inventory, setInventory] = useState([
    { id: 1, bloodType: "A+", quantity: 10 },
    { id: 2, bloodType: "O-", quantity: 0 },
    { id: 3, bloodType: "B+", quantity: 5 },
    { id: 4, bloodType: "AB-", quantity: 0 },
    { id: 5, bloodType: "O+", quantity: 7 },
    { id: 6, bloodType: "A-", quantity: 3 },
    { id: 7, bloodType: "B-", quantity: 2 },
    { id: 8, bloodType: "AB+", quantity: 0 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const bloodTypes = ["A+", "O-", "B+", "AB-", "O+", "A-", "B-", "AB+"];


  // Calculate total blood units
  const totalBloodUnits = inventory.reduce((acc, item) => acc + item.quantity, 0);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedBloodType("");
    setSelectedQuantity("");
  };

  const handleAddNewInventory = () => {
    if (selectedBloodType && selectedQuantity) {
      const quantity = parseInt(selectedQuantity);
      const existingBlood = inventory.find((item) => item.bloodType === selectedBloodType);

      if (existingBlood) {
        const updatedInventory = inventory.map((item) =>
          item.bloodType === selectedBloodType
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setInventory(updatedInventory);
        setSnackbar({ open: true, message: "Inventory updated successfully!", severity: "success" });
      } else {
        const newBlood = {
          id: inventory.length + 1,
          bloodType: selectedBloodType,
          quantity,
        };
        setInventory([...inventory, newBlood]);
        setSnackbar({ open: true, message: "New inventory added successfully!", severity: "success" });
      }
      handleDialogClose();
    } else {
      setSnackbar({ open: true, message: "Please select a blood type and quantity!", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Blood Inventory Management
      </Typography>

      <Typography variant="h6" align="center" sx={{ mb: 4 }}>
        Total Blood Units Available: {totalBloodUnits}
      </Typography>

      {/* Display Blood Bank Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {inventory.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: item.quantity === 0 ? "#f44336" : "#fff",
              color: item.quantity === 0 ? "#fff" : "#000",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item.bloodType}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Quantity: {item.quantity === 0 ? "Out of Stock" : item.quantity}
              </Typography>
              {item.quantity === 0 && (
                <LinearProgress sx={{ marginTop: 2 }} variant="determinate" value={0} />
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="error"
                onClick={() => setInventory(inventory.filter((b) => b.id !== item.id))}
                disabled={item.quantity === 0}
                sx={{
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleDialogOpen}
          sx={{
            padding: "10px 20px",
            borderRadius: "20px",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          Add New Inventory
        </Button>
      </Box>

      {/* Dialog for Adding New Inventory */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Blood Inventory</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Blood Type</InputLabel>
            <Select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              label="Blood Type"
            >
              {bloodTypes.map((bloodType) => (
                <MenuItem key={bloodType} value={bloodType}>
                  {bloodType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddNewInventory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Inventory;
