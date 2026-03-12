import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

//icons
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";

const StudentLayout = () => {
  const navigate = useNavigate();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  // get user data from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  // menu Items
  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "My Complaints", path: "/student/complaints" },
  ];

  //logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/student-login");
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* desktop sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: "#0b045c",
          color: "#fff",
          flexDirection: "column",
          p: 2,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        {/* PROFILE */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 1 }} />
          <Typography fontWeight={600}>
            {" "}
            Welcome, {user?.name || "Student"} 👋
          </Typography>
        </Box>

        {/* menu items */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {menuItems.map((menu) => (
            <Button
              key={menu.name}
              variant="contained"
              onClick={() => navigate(menu.path)}
              sx={{
                justifyContent: "flex-start",
                bgcolor: "#6d5edb",
                borderRadius: "12px",
                p: 1.2,
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#fcba03",
                },
              }}
            >
              {menu.name}
            </Button>
          ))}
          <Button
            sx={{
              bgcolor: "#6d5edb",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fcba03",
              },
            }}
            onClick={() => setOpenLogoutDialog(true)}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* MOBILE TOP BAR */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 1 }} />
            <Typography fontWeight={600}>
              Welcome, {user?.name || "Student"} 👋
            </Typography>
          </Box>
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "5px",
            },

            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#a931be",
              borderRadius: "10px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              background: "#9227a7",
            },
          }}
        >
          {" "}
          <Outlet />{" "}
        </Box>

        {/* MOBILE BOTTOM NAVBAR */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={() => navigate("/student/dashboard")}
            />
            <BottomNavigationAction
              label="My Complaints"
              icon={<ReportIcon />}
              onClick={() => navigate("/student/complaints")}
            />
            <BottomNavigationAction
              label="Logout"
              icon={<LogoutIcon />}
              onClick={() => setOpenLogoutDialog(true)}
            />
          </BottomNavigation>
        </Box>
        {/* LOGOUT CONFIRMATION DIALOG */}
        <Dialog
          open={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
        >
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to logout?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
            <Button color="error" onClick={handleLogout}>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default StudentLayout;
