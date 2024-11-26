import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Button,
  Avatar,
  useTheme,
} from "@mui/material";

const columns = [
  { id: "sno", label: "S.No", minWidth: 50 },
  { id: "userName", label: "User Name", minWidth: 100 },
  { id: "bloodType", label: "Blood Type", minWidth: 100 },
  { id: "quantity", label: "Quantity", minWidth: 100 },
  { id: "distance", label: "Distance (km)", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 150 },
];

function BloodRequestTable({ requests, onApprove, onReject }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme(); // Hook to access the current theme

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: 4,
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textTransform: "uppercase",
        }}
      >
        Blood Request Management
      </Typography>

      <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.mode === "dark" ? "#1976d2" : "#ffffff",
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#1976d2",
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      color: theme.palette.mode === "dark" ? "#ffffff" : "#1976d2",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={request.id}>
                    {columns.map((column, columnIndex) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id}>
                            {request.status === "Pending" ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() => onApprove(request)}
                                  sx={{
                                    marginRight: 1,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => onReject(request)}
                                  sx={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Chip
                                label={request.status}
                                color={
                                  request.status === "Approved"
                                    ? "success"
                                    : request.status === "Rejected"
                                    ? "error"
                                    : "default"
                                }
                                size="small"
                              />
                            )}
                          </TableCell>
                        );
                      }

                      if (column.id === "sno") {
                        return (
                          <TableCell key={column.id} align="center">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                        );
                      }

                      if (column.id === "userName") {
                        return (
                          <TableCell key={column.id} sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ marginRight: 1 }} />
                            {request.userName}
                          </TableCell>
                        );
                      }

                      const value = request[column.id];
                      return (
                        <TableCell key={column.id}>
                          {column.id === "status" ? (
                            <Chip
                              label={value}
                              color={
                                value === "Approved"
                                  ? "success"
                                  : value === "Rejected"
                                  ? "error"
                                  : "warning"
                              }
                              size="small"
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default function RequestManagement() {
  const [requests, setRequests] = useState([
    { id: 1, userName: "John Doe", bloodType: "A+", quantity: 3, distance: 10, status: "Pending" },
    { id: 2, userName: "Jane Smith", bloodType: "O-", quantity: 2, distance: 25, status: "Pending" },
    { id: 3, userName: "Sam Wilson", bloodType: "B+", quantity: 5, distance: 15, status: "Approved" },
    { id: 4, userName: "Mike Johnson", bloodType: "AB-", quantity: 1, distance: 30, status: "Rejected" },
    { id: 5, userName: "Emily Davis", bloodType: "O+", quantity: 4, distance: 18, status: "Pending" },
    { id: 6, userName: "Sophia Lee", bloodType: "A-", quantity: 6, distance: 20, status: "Approved" },
    // Add more data as needed
  ]);

  const handleApprove = (request) => {
    const updatedRequests = requests.map((r) =>
      r.id === request.id ? { ...r, status: "Approved" } : r
    );
    setRequests(updatedRequests);
  };

  const handleReject = (request) => {
    const updatedRequests = requests.map((r) =>
      r.id === request.id ? { ...r, status: "Rejected" } : r
    );
    setRequests(updatedRequests);
  };

  return (
    <BloodRequestTable
      requests={requests}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
