import React, { useState } from "react";
import { Outlet } from "react-router-dom";
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

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Complaints", path: "/admin/complaints" },
    { name: "Departments", path: "/admin/departments" },
    { name: "User Management", path: "/admin/users" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/admin-login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* DESKTOP SIDEBAR */}
      <Box
        sx={{
          width: 240,
          bgcolor: "#5d0367",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          borderRight: "1px solid #a931be",
          p: 2,
          color: "#fff",
        }}
      >
        {/* Profile */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 1 }} />
          <Typography fontWeight={600}>{user?.name || "Admin"}</Typography>
        </Box>

        {/* Menu */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="contained"
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: "flex-start",
                bgcolor: "#a931be",
                borderRadius: "12px",
                p: 1.2,
                color: "#fff",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#9227a7",
                },
              }}
            >
              {item.name}
            </Button>
          ))}

          <Button
            sx={{
              bgcolor: "#9227a7",
              color: "#fff",
              "&:hover": {
                bgcolor: "#a931be",
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
              Welcome, {user?.name || "Admin"} 👋
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
        <Box
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="Home"
              icon={<DashboardIcon />}
              onClick={() => navigate("/admin/dashboard")}
            />

            <BottomNavigationAction
              label="Complaints"
              icon={<ReportIcon />}
              onClick={() => navigate("/admin/complaints")}
            />

            <BottomNavigationAction
              label="Departments"
              icon={<ApartmentIcon />}
              onClick={() => navigate("/admin/departments")}
            />

            <BottomNavigationAction
              label="Users"
              icon={<PeopleIcon />}
              onClick={() => navigate("/admin/users")}
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
            <DialogContentText>
              Are you sure you want to logout?
            </DialogContentText>
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

export default AdminLayout;
