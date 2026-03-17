import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Paper,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { getAllDepartments , raiseComplaint} from "../../api/auth.api";


const StudentComplaints = () => {
  const [departments, setDepartments] = useState([]);

  // state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  //image state
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // snabar state
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("success");

  //dialog state
  const [openDialog, setOpenDialog] = useState(false);

  //loading state
  const [loading, setLoading] = useState(false);

  //fetching Departments
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDialog = () => {
    if (!title || !departmentId || !description) {
      setSnackMsg("please fill all required feilds");
      setSnackType("error");
      setOpenSnack(true);
      return;
    }
    setOpenDialog(true);
  };

  // actual submit 
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("departmentId", departmentId);
      if(image){
        formData.append("image", image)
      }
      await raiseComplaint(formData);
      setSnackMsg("Complaint submitted successfully");
      setSnackType("success");
      setOpenSnack(true);

      //reset Form
      setTitle("")
      setDescription("")
      setDepartmentId("")
      setImage(null)
      setPreview(null);
      
    } catch (error) {
      console.log(error)
      setSnackMsg("Something went wrong");
      setSnackType("error");
      setOpenSnack(true)
    } finally{
      setLoading(false)
      setOpenDialog(false)
    }
  }

  console.log("departments:", departments);
  console.log("deprtmentID:", departmentId);

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
        p: 2,
        background: "#f5f7fb",
      }}
    >
      <Paper sx={{ width: { xs: "100%", md: "80%" }, p: 2, borderRadius: 1 }}>
        <Typography variant="h6" mb={3}>
          Raise Complaint
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          rows={3}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Department"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          sx={{ mb: 2 }}
        >
          {departments.map((dept) => (
            <MenuItem key={dept.id} value={dept.id}>
              {dept.department_name}
            </MenuItem>
          ))}
        </TextField>

        {/* image upload container */}
        <Box
          component="label"
          sx={{
            border: "2px dashed #ccc",
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            mb: 3,
          }}
        >
          <input type="file" hidden onChange={handleImage} />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                padding: "10px",
                borderRadius: "20px",
              }}
            />
          ) : (
            <CameraAltIcon sx={{ fontSize: 40, color: "#999" }} />
          )}
        </Box>
        {/* submit button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.5, borderRadius: "3" }}
          onClick={handleDialog}
        >
          Submit Compalint
        </Button>
      </Paper>
      {/* conformation dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>Are you sure you want to raise this complaint?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" >{loading ? <CircularProgress size={20}/>: "Confirm"}</Button>
        </DialogActions>
      </Dialog>

      {/* snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        
      >
        <Alert severity={snackType} variant="filled">{snackMsg}</Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentComplaints;
