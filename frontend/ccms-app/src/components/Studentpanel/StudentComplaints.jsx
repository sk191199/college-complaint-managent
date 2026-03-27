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
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllComplaintsByUser } from "../../api/auth.api";

const StudentComplaints = () => {
  const [myComplaints, setMyComplaints] = useState([]);

  // fetch complaints
  const fetchMyComplaints = async () => {
    try {
      const response = await getAllComplaintsByUser();
      const data = response.data.data;
      console.log("res", data);
      setMyComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" color="initial">
        My Compalints
      </Typography>
      {/* ===== table ===== */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{backgroundColor:"#f1f1f1"}}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myComplaints.map((item) => (
              <TableRow key={item.complaint_id}>
                <TableCell>{item.complaint_id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.department.department_name}</TableCell>
                <TableCell>
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TablePagination component="div"></TablePagination> */}
          <TablePagination ></TablePagination>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentComplaints;
