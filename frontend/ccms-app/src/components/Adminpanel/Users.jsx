import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllUsers } from "../../api/auth.api";
const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Box display="" mx="" my="" sx="">
      <Typography variant="h5" color="initial">
        Students
      </Typography>
      {/* user table */}
      <Box sx={{ mt: 4 }}>
        <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error">
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
    </Box>
  );
};

export default Users;
