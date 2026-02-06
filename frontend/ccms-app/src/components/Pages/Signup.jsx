// React core
import React, { useState } from "react";

// MUI components
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

// Router
import { useNavigate } from "react-router-dom";

// API
import { signupUser } from "../../api/auth.api";

const Signup = () => {

  // For navigation
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: ""
  });

  // Loader state
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" // success | error | warning | info
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Close snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, gender, phone } = formData;

    // Validation
    if (!name || !email || !password || !gender || !phone) {
      setSnackbar({
        open: true,
        message: "All fields are required",
        severity: "warning"
      });
      return;
    }

    setLoading(true);

    try {
      // API call
      await signupUser(formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        gender: "",
        phone: ""
      });

      // Success snackbar
      setSnackbar({
        open: true,
        message: "Signup successful! Redirecting to login...",
        severity: "success"
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Signup failed",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page layout */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#F1F5F9"
      >
        {/* Card */}
        <Paper elevation={4} sx={{ p: 4, width: 380, borderRadius: 3 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
          >
            Student Signup
          </Typography>

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              margin="normal"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="others">Other</MenuItem>
            </TextField>

            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              fullWidth
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, height: 45 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for success / error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Signup;
