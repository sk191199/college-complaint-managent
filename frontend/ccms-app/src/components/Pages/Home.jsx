import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import student_img from "../imgs/students_img.png";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Button from "@mui/material/Button";



const Home = () => {
  return (
    <Box>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 8 },
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Left Content */}
        <Box sx={{ width: { xs: "100%", md: "49%" } }}>
          <Typography variant="h2">
            Your Voice Matters. Let's{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Resolve It
            </Box>
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
            A transparent system for reporting and tracking campus issues
          </Typography>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "45%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={student_img}
            alt="students"
            sx={{
              width: { xs: "90%", md: "80%" },
              maxWidth: 420,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          px: { xs: 2, md: 6 },
          py: 4,
        }}
      >
        {/* Student Portal */}
        <Box
          sx={{
            width: { xs: "100%", md: "49%" },
            display: "flex",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1, // ⭐ equal height
              backgroundColor:"background.default",
              borderRadius:1,
              border: "2px solid #ffffff"
            }}
          >
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              Student Portal
            </Typography>

            <SchoolIcon sx={{ fontSize: 50, color: "primary.main" }} />

            <Typography variant="h6" sx={{ color: "primary.main" }}>
              Student Login
            </Typography>

            <Typography variant="body1" color="text.secondary">
              New Student Sign Up
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: "auto" }} // ⭐ push button to bottom
            >
              File a Complaint
            </Button>
          </Paper>
        </Box>

        {/* Admin Portal */}
        <Box
          sx={{
            width: { xs: "100%", md: "49%" },
            display: "flex",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              flexGrow: 1, // ⭐ equal height
              backgroundColor:"background.default",
              borderRadius:1, 
              border:"2px solid #ffffff"
            }}
          >
            <Typography variant="h5">Admin & Staff Login</Typography>

            <AdminPanelSettingsIcon sx={{ fontSize: 50 }} />

            <Typography variant="h6">Admin Login</Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: "auto", backgroundColor: "text.primary" }} // ⭐ same bottom alignment
            >
              Login
            </Button>
          </Paper>
        </Box>
      </Box>
      <Divider  sx={{my:2}}/>
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:1, width:"100%", p:2}}>
        <Typography variant="h6" sx={{color:"text.primary"}}>Emergency Contact: <Link underline="hover" href="tel:+918142288033">+91 8142288033</Link> & </Typography>
        <Link underline="hover" sx={{fontSize:"14px"}}>Privacy Policy</Link>
      </Box>

    </Box>
  );
};

export default Home;
