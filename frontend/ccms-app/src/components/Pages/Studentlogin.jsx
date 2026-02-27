import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

//import login api
import { loginUser } from "../../api/auth.api";

const Studentlogin = () => {
  const navigate = useNavigate();
  //login data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // error msg state
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //loading and success states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  //handle input function
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //5️ Login function
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
    try {
      setLoading(true);

      const res = await loginUser(formData);

      //store token in localstorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      // Get error message and field from backend response
      const errorMessage = error.response?.data?.message || "An error occurred";
      const errorField = error.response?.data?.field;

      // Set error only on the specific field that failed
      if (errorField === "email") {
        setErrors({ email: errorMessage, password: "" });
      } else if (errorField === "password") {
        setErrors({ email: "", password: errorMessage });
      } else {
        // Generic error - show on both fields
        setErrors({ email: errorMessage, password: errorMessage });
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // handleClickRegister
  const handleClickRegister = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/signup");
    }, 1500);
  };

  // handleClickForgot
  const handleClickForgot = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/Change-password");
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Box sx={{ width: { xs: "90%", sm: 420 }, textAlign: "center" }}>
        <Typography
          sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 600, mb: 2 }}
        >
          Student Login
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
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              margin="normal"
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, height: 45, backgroundColor: "text.primary" }}
              onClick={handleLogin}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "1rem",
              }}
            >
              <Typography>
                <Link
                  underline="hover"
                  sx={{ color: "red" }}
                  component="button"
                  onClick={handleClickRegister}
                >
                  Register
                </Link>
              </Typography>

              <Typography>
                <Link
                  underline="hover"
                  sx={{ color: "red" }}
                  component="button"
                  onClick={handleClickForgot}
                >
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Studentlogin;
