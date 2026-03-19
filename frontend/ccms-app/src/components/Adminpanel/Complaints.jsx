import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  MenuItem,
  Select,
  Avatar,
  TextField,
  Tabs,
  Tab,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllComplaints } from "../../api/auth.api";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [statusMap, setStatusMap] = useState({});

  // Fetch data
  const fetchComplaints = async () => {
    try {
      const response = await getAllComplaints();
      const data = response.data.data;

      setComplaints(data);
      setFiltered(data);

      const map = {};
      data.forEach((item) => {
        map[item.complaint_id] = item.status;
      });
      setStatusMap(map);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter logic
  useEffect(() => {
    let data = complaints;

    if (tab !== "all") {
      data = data.filter((c) => c.status === tab);
    }

    if (search) {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, tab, complaints]);

  // Status colors
  const getStatusColor = (status) => {
    if (status === "pending") return "warning";
    if (status === "in-progress") return "info";
    if (status === "resolved") return "success";
    if (status === "rejected") return "error";
    return "default";
  };

  // Change status
  const handleStatusChange = (id, value) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // Update status
  const handleUpdate = (id) => {
    const status = statusMap[id];
    console.log("Update:", id, status);

    // 🔥 Call backend API here
    // updateComplaintStatus(id, { status });

    alert("Status updated (frontend only)");
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        backgroundColor: "#F4F6F8",
        minHeight: "100vh"
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Complaints Dashboard
      </Typography>

      {/* SEARCH */}
      <TextField
        size="small"
        fullWidth
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, background: "#fff", borderRadius: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      {/* TABS */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ mb: 2 }}
      >
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="In Progress" value="in-progress" />
        <Tab label="Resolved" value="resolved" />
        <Tab label="Rejected" value="rejected" />
      </Tabs>

      {/* GRID */}
      <Grid container spacing={2} justifyContent="center">
        {filtered.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.complaint_id}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" }
              }}
            >
              <CardContent>
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Chip
                    label={statusMap[item.complaint_id]}
                    color={getStatusColor(
                      statusMap[item.complaint_id]
                    )}
                    size="small"
                  />
                </Box>

                {/* DESCRIPTION */}
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {item.description}
                </Typography>

                {/* IMAGE */}
                {item.image && (
                  <Box mt={2}>
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />
                  </Box>
                )}

                {/* USER */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Avatar sx={{ bgcolor: "#0B5ED7", mr: 1 }}>
                    {item.user.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">
                      {item.user.name}
                    </Typography>
                    <Typography variant="caption">
                      {item.user.email}
                    </Typography>
                  </Box>
                </Box>

                {/* DEPARTMENT */}
                <Typography mt={1} variant="body2">
                  Department:{" "}
                  <b>{item.department.department_name}</b>
                </Typography>

                {/* DATE */}
                <Typography variant="caption" color="gray">
                  {new Date(item.created_at).toLocaleString()}
                </Typography>

                {/* ACTION */}
                <Box
                  mt={2}
                  display="flex"
                  gap={1}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <Select
                    size="small"
                    value={statusMap[item.complaint_id]}
                    onChange={(e) =>
                      handleStatusChange(
                        item.complaint_id,
                        e.target.value
                      )
                    }
                    fullWidth
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">
                      In Progress
                    </MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#0B5ED7",
                      "&:hover": { backgroundColor: "#084298" }
                    }}
                    onClick={() =>
                      handleUpdate(item.complaint_id)
                    }
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Complaints;