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
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import AOS from "aos";
import "aos/dist/aos.css";

import {
  getAllComplaints,
  getComplaintCounts,
  updateComplaint,
} from "../../api/auth.api";

const Complaints = () => {
  // states
  const [complaints, setComplaints] = useState([]);
  // filter complaints
  const [filtered, setFiltered] = useState([]);
  // page
  const [page, setPage] = useState(0);
  // roes per page
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // total rows
  const [totalRows, setTotalRows] = useState(0);
  // status filter
  const [statusFilter, setStatusFilter] = useState("all");
  // status map for each complaint
  // Example -> {1:"pending",2:"resolved"}
  const [statusMap, setStatusMap] = useState({});
  //selected item and open dialog state
  const [open, setOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  // search state
  const [search, setSearch] = useState("");
  //snackbar msg and type state
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackType, setSnackType] = useState("");
  const [snackopen, setSnackOpen] = useState(false);

  // total & pending & resolved & in-progress & rejeted states
  const [totalCount, setTotalCount] = useState(0);
  const [totalPendingCount, setTotalPendingCount] = useState(0);
  const [totalInProgressCount, setTotalInProgressCount] = useState(0)
  const [totalResolveCount, setTotalResolveCount] = useState(0);
  const [totalRejectCount, setTotalRejectCount] = useState(0);

  //   STATUS CHIP COLOR FUNCTION
  // ====================================================== */

  const getStatusColor = (status) => {
    if (status === "pending") return "warning";

    if (status === "in-progress") return "info";

    if (status === "resolved") return "success";

    if (status === "rejected") return "error";

    return "default";
  };

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
      // set filter complaints
      setFiltered(data);
      // set total rows
      setTotalRows(response.data.total);

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
      setTotalInProgressCount(response.data.totalInProgressCount)
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

  // client side search complaint
  useEffect(() => {
    let data = complaints;

    if (search) {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (statusFilter !== "all") {
      data = data.filter(
        (c) => c.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }
    setFiltered(data);
  }, [search, statusFilter, complaints]);

  // handleStatusChange
  const handleStatusChange = (id, value) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  //handleUpdate
  const handleUpdate = async (id) => {
    try {
      const status = statusMap[id];
      await updateComplaint(id, status);
      setSnackOpen(true);
      setSnackType("success");
      setSnackbarMsg("Updated Successfully");

      await fetchComplaints();
      await fetchCount();
    } catch (error) {
      console.log(error);
      setSnackType("error")
      setSnackbarMsg("Something went wrong")
    }
  };

  // page handlers
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    // reset to first page
    setPage(0);
  };

  return (
    <Box sx={{ p: 1, background: "#F4F6F8", minHeight: "100vh" }}>
      <Typography variant="h6" color="initial" sx={{ mb: 2 }}>
        Complaints
      </Typography>
      {/* cards */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 3 }} data-aos="flip-right">
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
        <Grid size={{ xs: 6, md: 3 }} data-aos="flip-right">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="initial">
                In-Progress
              </Typography>
              <Typography variant="h4" color="initial">
                {totalInProgressCount}
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
          <TextField
            placeholder="Search Complaints..."
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
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
                <TableCell>
                  <Chip
                    label={statusMap[item.complaint_id]}
                    color={getStatusColor(statusMap[item.complaint_id])}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                {/* status menus with update button */}
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Select
                      size="small"
                      value={statusMap[item.complaint_id]}
                      onChange={(e) =>
                        handleStatusChange(item.complaint_id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In-Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        handleUpdate(item.complaint_id);
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </TableCell>
                {/* // view button */}
                <TableCell>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    onClick={() => {
                      setSelectedComplaint(item);
                      setOpen(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ====== pagination ==== */}
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </TableContainer>

      {/* ===== Dialog ===== */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        {selectedComplaint && (
          <>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedComplaint.title}
              </Typography>
              <Typography mt={1}>{selectedComplaint.description}</Typography>
              {selectedComplaint.image && (
                <Box mt={2}>
                  <img
                    src={`http://localhost:5000/uploads/${selectedComplaint.image}`}
                    alt="imgg"
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      objectFit: "cover",
                      height: "300px",
                    }}
                  />
                </Box>
              )}
              <Typography mt={2}>
                <b>User:</b> {selectedComplaint.user.name}
              </Typography>

              <Typography>
                <b>Email:</b> {selectedComplaint.user.email}
              </Typography>
              <Typography>
                <b>Phone:</b> {selectedComplaint.user.phone}
              </Typography>

              <Typography>
                <b>Department:</b>{" "}
                {selectedComplaint.department.department_name}
              </Typography>

              <Typography>
                <b>Date:</b>{" "}
                {new Date(selectedComplaint.created_at).toLocaleString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      {/* ====== snackbar ======= */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackopen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity={snackType} variant="filled">{snackbarMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Complaints;
