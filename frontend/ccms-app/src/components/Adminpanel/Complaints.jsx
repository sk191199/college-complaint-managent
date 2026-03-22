import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AOS from "aos";
import "aos/dist/aos.css";

import { getAllComplaints, getComplaintCounts } from "../../api/auth.api";

const Complaints = () => {
  // states
  const [complaints, setComplaints] = useState([]);
  // filter complaints
  const [filtered, setFiltered] = useState([]);
  // page
  const [page, setPage] = useState(0);
  // roes per page
  const [rowsPerPage] = useState(10);
  // status filter
  const [statusFilter, setStatusFilter] = useState("all");
  // status map for each complaint
  // Example -> {1:"pending",2:"resolved"}
  const [statusMap, setStatusMap] = useState({});
  // total & pending & resolved & in-progress & rejeted states
  const [totalCount, setTotalCount] = useState(0);
  const [totalPendingCount, setTotalPendingCount] = useState(0);
  const [totalResolveCount, setTotalResolveCount] = useState(0);
  const [totalRejectCount, setTotalRejectCount] = useState(0);
  // initalize aos
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  // fetch complaints function
  const fetchComplaints = async () => {
    try {
      const response = await getAllComplaints(
        page + 1,
        rowsPerPage,
        statusFilter === "all" ? "" : statusFilter,
      );
      const data = response.data.data;
      console.log("data", data);
      //store complaints
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

  // fetched counts
  const fetchCount = async (req, res) => {
    try {
      const response = await getComplaintCounts();
      console.log("resCount", response.data);
      setTotalCount(response.data.totalCount);
      setTotalPendingCount(response.data.totalPendingCount);
      setTotalResolveCount(response.data.totalResolveCount);
      setTotalRejectCount(response.data.totalRejectCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [page, rowsPerPage, statusFilter]);

  // handleStatusChange
  const handleStatusChange = (id, value) => {
    setStatusMap((prev) => ({
      ...prev,
      [id] : value
    }))
  }

  //handleUpdate
  const handleUpdate = (id) => {
    console.log(id)
  }

  return (
    <Box sx={{ p: 1, background: "#F4F6F8", minHeight: "100vh" }}>
      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
        Complants
      </Typography>
      {/* cards */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 6, md: 3 }} data-aos="flip-right">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="initial">
                Total Complaints
              </Typography>
              <Typography variant="h4" color="initial">
                {totalCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} data-aos="flip-right">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="initial">
                Pending Complaints
              </Typography>
              <Typography variant="h4" color="initial">
                {totalPendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} data-aos="flip-left">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="green">
                Resolve Complaints
              </Typography>
              <Typography variant="h4" color="initial">
                {totalResolveCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }} data-aos="flip-left">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="red">
                Rejected Complaints
              </Typography>
              <Typography variant="h4" color="initial">
                {totalRejectCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* search and filter container */}
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField placeholder="Search Complaints..." fullWidth />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Select
            fullWidth
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In-Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* ============= TABLE ============= */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ background: "#f1f1f1" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.complaint_id}>
                <TableCell>
                  <Chip size="small" label={`#${item.complaint_id}`} />
                </TableCell>
                <TableCell>
                  {item.title.length > 30
                    ? item.title.substring(0, 30) + "..."
                    : item.title}
                </TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{item.department.department_name}</TableCell>
                <TableCell>{statusMap[item.complaint_id]}</TableCell>
                <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                {/* status menus with update button */}
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Select size="small" value={statusMap[item.complaint_id]} onChange={(e) => handleStatusChange(item.complaint_id, e.target.value)}>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem  value="in-progress">In-Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                      <MenuItem value="rejected" >Rejected</MenuItem>
                    </Select>
                    <Button size="small" variant="contained" onClick={handleUpdate(item.complaint_id)}>Update</Button>
                  </Box>
                </TableCell>
                {/* // view button */}
                <TableCell>
                  <Button startIcon={<VisibilityIcon/>} variant="outlined">View</Button>
                </TableCell>
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Complaints;
