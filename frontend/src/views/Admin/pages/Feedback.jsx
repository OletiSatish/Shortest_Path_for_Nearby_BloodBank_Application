import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const initialFeedbacks = [
  {
    id: 1,
    user: "John Doe",
    email: "john.doe@example.com",
    feedback: "The response time for requests is slow. Please improve.",
    status: "Pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane.smith@example.com",
    feedback: "Great service! Very professional staff.",
    status: "Resolved",
  },
];

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedFeedback(null);
    setResponse("");
    setIsDialogOpen(false);
  };

  const handleSendResponse = () => {
    if (selectedFeedback) {
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((fb) =>
          fb.id === selectedFeedback.id
            ? { ...fb, status: "Resolved" }
            : fb
        )
      );
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Feedback & Complaints
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">{feedback.user}</Typography>
              <Typography variant="body2" color="text.secondary">
                {feedback.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginTop: 2, fontStyle: "italic" }}
              >
                {feedback.feedback}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 1,
                  color: feedback.status === "Resolved" ? "green" : "orange",
                  fontWeight: "bold",
                }}
              >
                Status: {feedback.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                onClick={() => handleViewFeedback(feedback)}
              >
                View & Respond
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Dialog for viewing and responding to feedback */}
      {selectedFeedback && (
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Respond to Feedback</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>User:</strong> {selectedFeedback.user}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              <strong>Feedback:</strong> {selectedFeedback.feedback}
            </Typography>
            <TextField
              label="Your Response"
              fullWidth
              multiline
              rows={4}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
              Cancel
            </Button>
            <Button onClick={handleSendResponse} variant="contained">
              Send Response
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Feedback;
