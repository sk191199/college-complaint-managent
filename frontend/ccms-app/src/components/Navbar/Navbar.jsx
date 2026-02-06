import React, { useState } from "react";

// MUI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Logo image
import logo from "../imgs/ccms-logo.png";

const Navbar = () => {
  // 👉 State to OPEN / CLOSE mobile menu
  const [open, setOpen] = useState(false);

  // 👉 Open Drawer
  const openDrawer = () => {
    setOpen(true);
  };

  // 👉 Close Drawer
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      {/* ================== TOP NAVBAR ================== */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ minHeight: 74 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* ===== LEFT SIDE (LOGO + TITLE) ===== */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src={logo}
                alt="ccms-logo"
                sx={{ width: 70, height: 70 }}
              />

              <Typography variant="h5" sx={{ color: "primary.main" }}>
                College Complaints
              </Typography>
            </Box>

            {/* ===== RIGHT SIDE (DESKTOP MENU) ===== */}
            {/* Visible only on md and above */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Button color="primary">About</Button>
              <Button color="primary">Contact</Button>
              <Button color="primary">FAQ</Button>
              <Button variant="contained">Login</Button>
            </Box>

            {/* ===== MOBILE MENU ICON (☰) ===== */}
            {/* Visible only on mobile */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================== MOBILE DRAWER MENU ================== */}
      <Drawer
        anchor="right" // Drawer opens from RIGHT side
        open={open} // Open/Close based on state
        onClose={closeDrawer} // Close when clicked outside
      >
        <Box
          sx={{
            width: 280,
            p: 2,
            backgroundColor: "background.default",
            height: "100vh",
          }}
        >
          {/* ===== CLOSE ICON (❌) ===== */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* ===== MENU ITEMS ===== */}
          <List>
            {/* Clicking any item will also CLOSE the drawer */}
            <ListItem button onClick={closeDrawer}>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem button onClick={closeDrawer}>
              <ListItemText primary="Contact" />
            </ListItem>

            <ListItem button onClick={closeDrawer}>
              <ListItemText primary="FAQ" />
            </ListItem>

            <ListItem button variant="contained" onClick={closeDrawer}>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "primary.main" }}
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Box component="img" src={logo} sx={{ width: "100%" }}></Box>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
