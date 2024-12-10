import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: "Email and password are required.",
        severity: "error",
      });
      return;
    }
  
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );
  
      login({ token: data.token, role: data.role });
      const route = {
        admin: "/admin/dashboard",
        bloodbank: "/bloodbank/dashboard",
        user: "/user/home",  // Corrected route here
      }[data.role.trim().toLowerCase()];
  
      if (route) navigate(route);
      else navigate("/unauthorized");
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Login failed. Try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ height: "3rem", fontWeight: "bold" }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "primary.main" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "primary.main" }}
              onClick={() => navigate("/register")}
            >
              Don't have an account? Sign Up
            </Typography>
          </Box>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Login;
