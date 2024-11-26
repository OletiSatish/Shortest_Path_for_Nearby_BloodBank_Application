import  { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { CheckCircle, Cancel, AccessTime, LocalHospital } from "@mui/icons-material";

const EmergencyRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patientName: "John Doe",
      bloodType: "O+",
      unitsRequested: 2,
      status: "Pending",
      dateRequested: "2024-11-25T14:30:00Z",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      bloodType: "A+",
      unitsRequested: 1,
      status: "Accepted",
      dateRequested: "2024-11-25T10:00:00Z",
    },
    {
      id: 3,
      patientName: "Mark Lee",
      bloodType: "B-",
      unitsRequested: 3,
      status: "Rejected",
      dateRequested: "2024-11-24T18:45:00Z",
    },
  ]);

  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "Accepted" } : request
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Emergency Blood Requests
      </Typography>

      {/* Loop through all the requests */}
      <Stack spacing={3}>
        {requests.map((request) => (
          <Paper key={request.id} sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {request.patientName}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Blood Type: {request.bloodType}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Units Requested: {request.unitsRequested}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Request Date: {new Date(request.dateRequested).toLocaleString()}
                </Typography>

                {/* Status Indicator */}
                <Chip
                  label={request.status}
                  color={
                    request.status === "Accepted"
                      ? "success"
                      : request.status === "Rejected"
                      ? "error"
                      : "warning"
                  }
                  icon={
                    request.status === "Accepted" ? (
                      <CheckCircle />
                    ) : request.status === "Rejected" ? (
                      <Cancel />
                    ) : (
                      <AccessTime />
                    )
                  }
                  sx={{ mb: 2 }}
                />

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleAccept(request.id)}
                    disabled={request.status === "Accepted" || request.status === "Rejected"}
                    startIcon={<LocalHospital />}
                    sx={{
                      minWidth: 130,
                      padding: "8px 16px",
                      fontWeight: 600,
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleReject(request.id)}
                    disabled={request.status === "Accepted" || request.status === "Rejected"}
                    startIcon={<Cancel />}
                    sx={{
                      minWidth: 130,
                      padding: "8px 16px",
                      fontWeight: 600,
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default EmergencyRequests;
