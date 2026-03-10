import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Departments = () => {
  const [DepartmentName, setDepartmentName] = useState("");

  const handleDepartment = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleClickAdd = () => {
    console.log(DepartmentName);

    setDepartmentName("");
  };

  return (
    <Box>
      <Typography variant="h5" color="initial">
        Departments
      </Typography>
      {/* input box and add button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "2rem", mt: 2 }}>
        <TextField
          label="Enter Department Name"
          value={DepartmentName}
          onChange={handleDepartment}
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
    </Box>
  );
};

export default Departments;
