import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
  Snackbar,
  
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addDepartment,
  getAllDepartments,
  deleteDepartment,
} from "../../api/auth.api";

const Departments = () => {
  const [DepartmentName, setDepartmentName] = useState("");
  const [Departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [snacbarMsg, setSnackMsg] = useState("")

  // fetching departments
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  console.log("departments", Departments);

  const handleDepartment = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleClickAdd = async () => {
    setError("");

    if (DepartmentName === "") {
      setError("Department name Required");
      return;
    }

    try {
      const respone = await addDepartment({ departmentName: DepartmentName });
      console.log("Department", respone.data);
      //refresh
      fetchDepartments();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "something went wrong");
    }
    setOpen(true)
    setSnackMsg("Department Added Successfully!")
    setDepartmentName("");
  };

  // Edit button click
  const handleEdit = (dept) => {
    console.log("Edit Department:", dept);
  };

  // Delete button click
  const handleDelete = async (dept) => {
    try {
      await deleteDepartment(dept.id);
      setOpen(true);
      setSnackMsg("Department deleted successfully")

      //refresh departments
      fetchDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" color="initial">
        Departments
      </Typography>
      {/* input box and add button */}
      <Box
        sx={{ display: "flex", gap: "2rem", mt: 2, boxSizing: "border-box" }}
      >
        <TextField
          label="Enter Department Name"
          value={DepartmentName}
          onChange={handleDepartment}
          error={Boolean(error)}
          helperText={error}
          required
          sx={{ width: { xs: "75%", md: "50%" } }}
        />
        <Button
          variant="text"
          color="primary"
          sx={{
            width: { xs: "25%", md: "250px" },
            height: "55px",
            backgroundColor: "background.adminbg2",
            color: "#fff",
          }}
          onClick={handleClickAdd}
        >
          Add
        </Button>
      </Box>

      {/* Department Table */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Departments List
        </Typography>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>S.No</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Departments.length > 0 ? (
                Departments.map((dept, index) => (
                  <TableRow key={dept.id}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{dept.department_name}</TableCell>

                    <TableCell align="center">
                      {/* Edit Button */}
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(dept)}
                      >
                        <EditIcon />
                      </IconButton>

                      {/* Delete Button */}
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(dept)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No Departments Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        message=""
        autoHideDuration={3000}
        severity="success"
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
          }}
        >
          {snacbarMsg}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Departments;
