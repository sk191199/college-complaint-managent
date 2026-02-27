import Box from "@mui/material/Box";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// api
import { verifyEmail, changePassword } from "../../api/auth.api";

const Changepassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleVerify = async () => {
    setErrors({ email: "", password: "" });
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      await verifyEmail({ email });
      setVerified(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Unexpected error";
      setErrors({ email: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setErrors({ email: "", password: "" });
    if (!password) {
      setErrors({ password: "New password is required" });
      return;
    }

    setLoading(true);
    try {
      await changePassword({ email, newPassword: password });
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Unexpected error";
      const field = err.response?.data?.field;
      if (field === "email") {
        setErrors({ email: msg });
      } else {
        setErrors({ password: msg });
      }
    } finally {
      setLoading(false);
    }
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
        <Typography variant="h3" mb={2}>
          Change Password
        </Typography>

        {success ? (
          <Box display="" mx="" my="" sx="">
            <Typography color="green">
              Password changed successfully!
            </Typography>
            <Button sx={{mt:2, backgroundColor:"background.btns", color:"#fff"}} fullWidth>Login</Button>
          </Box>
        ) : (
          <Box>
            <TextField
              fullWidth
              label="Email"
              value={email}
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              disabled={verified}
            />
            {verified ? (
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={password}
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            ) : null}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, height: 45, backgroundColor: "text.primary" }}
              onClick={verified ? handleChangePassword : handleVerify}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : verified ? (
                "Change Password"
              ) : (
                "Verify Email"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Changepassword;
