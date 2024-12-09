import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" color="error">
        403 - Unauthorized
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        You do not have permission to access this page.
      </Typography>
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => navigate("/login")}>
        Go Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
