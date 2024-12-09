import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Blood donation camp scheduled for 25th Nov." },
    { id: 2, message: "Urgent need for blood Type A+ at City Hospital." },
  ]);
  const [newNotification, setNewNotification] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Add a new notification
  const handleAddNotification = () => {
    if (newNotification.trim() === "") {
      setSnackbar({ open: true, message: "Notification cannot be empty!", severity: "error" });
      return;
    }

    const newNotif = { id: Date.now(), message: newNotification };
    setNotifications([newNotif, ...notifications]);
    setNewNotification("");
    setSnackbar({ open: true, message: "Notification added successfully!", severity: "success" });
  };

  // Delete a notification
  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notif) => notif.id !== id);
    setNotifications(updatedNotifications);
    setSnackbar({ open: true, message: "Notification deleted successfully!", severity: "info" });
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Notifications
      </Typography>

      {/* Add Notification Section */}
      <Card sx={{ marginBottom: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Add New Notification
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              label="Notification Message"
              variant="outlined"
              fullWidth
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              onClick={handleAddNotification}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Notifications History
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <List>
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <ListItem
                  key={notif.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDeleteNotification(notif.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={notif.message} />
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: "text.secondary", marginTop: 2 }}>
                No notifications found.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationsPage;
