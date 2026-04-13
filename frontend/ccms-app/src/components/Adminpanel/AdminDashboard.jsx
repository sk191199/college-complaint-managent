import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

import ReportIcon from "@mui/icons-material/Report";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useState } from "react";
import { useEffect } from "react";

import { getTotalUsers, getTotalDepartments, getComplaintCounts } from "../../api/auth.api";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 120,
  p: 3,
  borderRadius: 2.5,
  color: "#fff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
  },
};

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0)
  const [totalPendingComplaints, setTotalPendingComplaints] = useState(0);
  const [totalResolvedComplaints, setTotalResolvedComplaints] = useState(0)

  // total users count
  const totalUsersCount = async () => {
    try {
      const response = await getTotalUsers();
      setTotalUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // total complaints count
  const totalComplaintsCount = async () => {
    try {
      const response = await getComplaintCounts()
      setTotalComplaints(response.data.totalCount)
      setTotalPendingComplaints(response.data.totalPendingCount)
      setTotalResolvedComplaints(response.data.totalResolveCount)
      
    } catch (error) {
      console.log(error)
    }
  }

  // total departments count
  const totalDepartmentsCount = async () => {
    try {
      const response = await getTotalDepartments();
      setTotalDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    totalUsersCount();
  }, []);

  useEffect(() => {
    totalDepartmentsCount();
  }, []);

  useEffect(() => {
    totalComplaintsCount();
  }, [])
  return (
    <Box>
      {/* Dashboard Title */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Complaints */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#3b82f6,#60a5fa)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalComplaints}
              </Typography>
              <Typography>Total Complaints</Typography>
            </Box>
            <ReportIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Pending Complaints */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#f59e0b,#fbbf24)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalPendingComplaints}
              </Typography>
              <Typography>Pending Complaints</Typography>
            </Box>
            <PendingActionsIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Resolved */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#10b981,#34d399)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalResolvedComplaints}
              </Typography>
              <Typography>Resolved</Typography>
            </Box>
            <CheckCircleIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Total Users */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#6366f1,#8b5cf6)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalUsers}
              </Typography>
              <Typography>Total Students</Typography>
            </Box>
            <PeopleIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Departments */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#ec4899,#f472b6)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {totalDepartments}
              </Typography>
              <Typography>Departments</Typography>
            </Box>
            <ApartmentIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>
      </Grid>

      {/* Recent Complaints Section */}
      <Box mt={5}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Complaints Analytics
        </Typography>

        
      </Box>
    </Box>
  );
};

export default AdminDashboard;
