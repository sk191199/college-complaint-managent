import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Typography,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
// import DeleteIcon from "@mui/icons-material/Delete";

import { getAllComplaintsByUser } from "../../api/auth.api";

const StudentComplaints = () => {
  const [myComplaints, setMyComplaints] = useState([]);
  const [filterComplaints, setFilterComplaints] = useState([])
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusMap, setStatusMap] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows,setTotalRows] = useState(0)

  // fetch complaints
  const fetchMyComplaints = async () => {
    try {
      const response = await getAllComplaintsByUser(
        page + 1,
        rowsPerPage,
        statusFilter === "all" ? "" : statusFilter,
      );
      const data = response.data.data.rows;
      console.log("response", response)
      console.log("res", data);
      setMyComplaints(data);
      setFilterComplaints(data)
      setTotalRows(response.data.total)

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
    fetchMyComplaints();
  }, [statusFilter, rowsPerPage, page]);

  //clinet side searach filter 
  useEffect(() => {
    let data = myComplaints;
    if(searchTitle){
      data = data.filter((c) => 
        c.title.toLowerCase().includes(searchTitle.toLowerCase())
      )
    }
    if (statusFilter !== "all") {
      data = data.filter(
        (c) => c.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }
    setFilterComplaints(data);
  }, [searchTitle, statusFilter, myComplaints])

  const getStatusColor = (status) => {
    if (status === "pending") return "warning";
    if (status === "in-progress") return "info";
    if (status === "resolved") return "success";
    if (status === "rejected") return "error";

    return "default";
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))

    setPage(0)
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" color="initial">
        My Compalints
      </Typography>
      {/* ===== table ===== */}
      <Grid container spacing={1} mt={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            placeholder="Search Compliant"
            fullWidth
            value={searchTitle}
            onChange={(e) => {
              setSearchTitle(e.target.value);
            }}
            InputProps={{
              startAdornment:(
                <InputAdornment>
                  <SearchIcon/>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Select
            fullWidth
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In-Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f1f1" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>

              <TableCell>Status</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterComplaints.map((item) => (
              <TableRow key={item.complaint_id}>
                <TableCell>
                  <Chip label={`# ${item.complaint_id}`} size="small" />
                </TableCell>
                <TableCell>{item.title}</TableCell>

                <TableCell>
                  <Chip
                    label={statusMap[item.complaint_id]}
                    size="small"
                    color={getStatusColor(statusMap[item.complaint_id])}
                  />
                </TableCell>
                <TableCell>{item.department.department_name}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="outlined"
                    onClick={() => {
                      setSelectedComplaint(item);
                      setOpen(true);
                    }}
                  >
                    view
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        component="div"
        count={totalRows}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}

        >

        </TablePagination>
        
      </TableContainer>

      {/* dialog  */}
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
              <Typography variant="subtitle1" color="initial">
                <b>Title: </b>
                {selectedComplaint.title}
              </Typography>
              <Typography mt={2} color="initial">
                {" "}
                <b>Description: </b>
                {selectedComplaint.description}
              </Typography>
              {selectedComplaint.image && (
                <Box mt={2}>
                  <img
                    src={`http://localhost:5000/uploads/${selectedComplaint.image}`}
                    alt="imgg"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "300px",
                      borderRadius: "12px",
                    }}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default StudentComplaints;
