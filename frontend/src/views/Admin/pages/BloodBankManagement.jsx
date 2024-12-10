import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import BloodBankCreate from "../../../components/Bloodbank/BloodbankManagement/BloodBankCreate";
import BloodBankCard from "../../../components/Bloodbank/BloodbankManagement/BloodBankCard";
import BloodBankUpdate from "../../../components/Bloodbank/BloodbankManagement/BloodBankUpdate";
import ConfirmDialog from "../../../components/ConfirmDialog";

const BloodBankManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Fetch blood banks from the API
  const fetchBloodBanks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/bloodbank/");
      setBloodBanks(response.data);
    } catch (error) {
      console.error("Error fetching blood banks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodBanks(); // Fetch blood banks when the component mounts
  }, []);

  // Filter the blood banks based on the search term
  const filteredBloodBanks = bloodBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open edit dialog
  const handleOpenEditDialog = (bank) => {
    setSelectedBloodBank(bank);
    setEditDialogOpen(true);
  };

  // Close edit dialog
  const handleCloseEditDialog = (shouldRefresh) => {
    setEditDialogOpen(false);
    setSelectedBloodBank(null);
    if (shouldRefresh) {
      fetchBloodBanks(); // Refresh blood banks if edits were saved
      setSuccessMessage(true); // Show success message
    }
  };

  // Handle delete click
  const handleDeleteClick = (bank) => {
    setSelectedBloodBank(bank);
    setDeleteDialogOpen(true); // Open delete dialog
  };

  // Delete functionality
  const handleDeleteConfirm = async () => {
    if (selectedBloodBank) {
      try {
        await axios.delete(`http://localhost:8000/api/bloodbank/${selectedBloodBank._id}`);
        // Remove deleted blood bank from state
        setBloodBanks(bloodBanks.filter((bank) => bank._id !== selectedBloodBank._id)); 
        setDeleteDialogOpen(false); // Close dialog after deletion
        setSuccessMessage(true); // Trigger success message
        console.log(`Deleted blood bank with ID: ${selectedBloodBank._id}`);
      } catch (error) {
        console.error("Error deleting blood bank:", error);
      }
    }
  };

  // Handle create dialog close after successful creation
  const handleCreateFormClose = () => {
    setOpenCreateForm(false);
    fetchBloodBanks(); // Refresh blood banks after creation
    setSuccessMessage(true); // Show success message
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Blood Bank Management
      </Typography>

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
        <Button variant="contained" onClick={() => setOpenCreateForm(true)}>
          Add New Blood Bank
        </Button>
      </Paper>

      {/* List of Blood Banks */}
      <Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress />
          </Box>
        ) : (
          filteredBloodBanks.map((bank) => (
            <BloodBankCard
              key={bank._id}
              {...bank}
              onEdit={() => handleOpenEditDialog(bank)} // Open edit dialog
              onDelete={() => handleDeleteClick(bank)} // Open delete dialog
            />
          ))
        )}
      </Box>

      {/* Dialog for BloodBankCreate */}
      <Dialog open={openCreateForm} onClose={() => setOpenCreateForm(false)} fullWidth maxWidth="md">
        <DialogTitle>Create New Blood Bank</DialogTitle>
        <DialogContent>
          <BloodBankCreate onClose={handleCreateFormClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateForm(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => handleCloseEditDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Blood Bank</DialogTitle>
        <DialogContent>
          {selectedBloodBank && (
            <BloodBankUpdate bloodBank={selectedBloodBank} onClose={handleCloseEditDialog} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Blood Bank"
        message="Are you sure you want to delete this blood bank?"
      />

      {/* Success Snackbar */}
      <Snackbar open={successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(false)}>
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: "100%" }}>
          Blood Bank deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BloodBankManagement;
