import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

import ReportIcon from "@mui/icons-material/Report";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";

import {
  getTotalUsers,
  getTotalDepartments,
  getComplaintCounts,
  getDepartmentWiseCompplaintCount,
} from "../../api/auth.api";

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

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
];

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalPendingComplaints, setTotalPendingComplaints] = useState(0);
  const [totalResolvedComplaints, setTotalResolvedComplaints] = useState(0);

  const [data, setData] = useState([]);

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
      const response = await getComplaintCounts();
      setTotalComplaints(response.data.totalCount);
      setTotalPendingComplaints(response.data.totalPendingCount);
      setTotalResolvedComplaints(response.data.totalResolveCount);
    } catch (error) {
      console.log(error);
    }
  };

  // total departments count
  const totalDepartmentsCount = async () => {
    try {
      const response = await getTotalDepartments();
      setTotalDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get departmentwise complaint count
  const departmentWiseComplaintCount = async () => {
    try {
      const res = await getDepartmentWiseCompplaintCount();
      const formatted = res.data.map((item) => ({
        department: item.department,
        count: Number(item.count),
      }));

      setData(formatted);
      console.log("res-data", formatted);
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
  }, []);

  useEffect(() => {
    departmentWiseComplaintCount();
  }, []);
  return (
    <Box>
      {/* Dashboard Title */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Admin Dashboard
      </Typography>
      {/* compaints counts conatiner */}
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

      {/* Complaints Analaytics Section */}
      <Box mt={5} sx={{ width: "100%" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Complaints Analytics
        </Typography>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, overflow: "hidden" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Department Wise Complaints
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  {/*  Department Names on X-axis */}
                  <XAxis
                    dataKey="department"
                    label={{
                      value: "Departments",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Count",
                      angle: 90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#3b82f6"
                    radius={[10, 10, 0, 0]}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* ===== pie chart ====== */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2, overflow: "hidden" }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Department Wise Complaints
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="department"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    paddingAngle={3}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val} complaints`} />

                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
