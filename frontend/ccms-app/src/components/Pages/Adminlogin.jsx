import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

import logo from "../imgs/ccms-logo.png";

const Adminlogin = () => {
  const navigate = useNavigate();

  // 1️⃣ Single object for email & password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 2️⃣ Error messages
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // 3️⃣ Loader & success
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 4️⃣ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5️⃣ Login function
  const handleLogin = async () => {
    setErrors({ email: "", password: "" });

    // validation
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!formData.password) {
      setErrors({ password: "Password is required" });
      return;
    }

    setLoading(true);

    // 🔹 SEND OBJECT TO BACKEND
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    console.log("Sending to backend:", loginData);

    // 🔹 Simulating API call
    setTimeout(() => {
      const dbEmail = "admin@gmail.com";
      const dbPassword = "admin123";

      if (loginData.email !== dbEmail) {
        setErrors({ email: "Invalid email" });
        setLoading(false);
        return;
      }

      if (loginData.password !== dbPassword) {
        setErrors({ password: "Invalid password" });
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: { xs: "90%", sm: 420 }, textAlign: "center" }}>
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ width: { xs: "40%", md: "20%" }, mb: 2 }}
        />

        {/* Title */}
        <Typography
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 600,
            mb: 2,
          }}
        >
          Admin Login
        </Typography>

        {success ? (
          <>
            <CheckCircleIcon sx={{ fontSize: 80, color: "green", mt: 2 }} />
            <Typography mt={1} variant="h6">
              Login Successful
            </Typography>
          </>
        ) : (
          <Paper elevation={3} sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, height: 45, backgroundColor:"text.primary" }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>

            <Typography mt={2} textAlign="right">
              <Link underline="hover" sx={{color:"red"}}>Forgot Password?</Link>
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Adminlogin;
