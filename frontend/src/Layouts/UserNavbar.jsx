import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

function UserNavbar() {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BloodBank
          </Typography>

          {/* Navigation Links */}
          <div>
            <Button color="inherit" component={Link} to="/user/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/user/about">
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/user/donate">
              Donate Blood
            </Button>
            <Button color="inherit" component={Link} to="/user/contact">
              Contact
            </Button>
          </div>

          {/* User Authentication Links */}
          <div>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default UserNavbar;
