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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import DeleteIcon from "@mui/icons-material/Delete";

import { getAllComplaintsByUser } from "../../api/auth.api";

const StudentComplaints = () => {
  const [myComplaints, setMyComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusMap, setStatusMap] = useState([]);
  const [open, setOpen] = useState(false);

  // fetch complaints
  const fetchMyComplaints = async () => {
    try {
      const response = await getAllComplaintsByUser();
      const data = response.data.data;
      console.log("res", data);
      setMyComplaints(data);

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
  }, []);

  const getStatusColor = (status) => {
    if (status === "pending") return "warning";
    if (status === "in-progress") return "info";
    if (status === "resolved") return "success";
    if (status === "rejected") return "error";

    return "default";
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" color="initial">
        My Compalints
      </Typography>
      {/* ===== table ===== */}
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
            {myComplaints.map((item) => (
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
