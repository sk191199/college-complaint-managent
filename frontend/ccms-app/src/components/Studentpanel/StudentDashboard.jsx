import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";

import ReportIcon from "@mui/icons-material/Report";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "120px",
  p: 3,
  borderRadius: 2.5,
  color: "#fff",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
  },
};

const StudentDashboard = () => {
  const Navigate = useNavigate();

  //handleComplaintBtn logic
  const handleComplaintBtn = () => {
    Navigate("/student/raisecomplaint");
  };
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Total Complaints */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#3b82f6,#60a5fa)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                20
              </Typography>
              <Typography variant="body1">Total Complaints</Typography>
            </Box>
            <ReportIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Pending */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#f59e0b,#fbbf24)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                10
              </Typography>
              <Typography variant="body1">Pending</Typography>
            </Box>
            <PendingActionsIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Resolved */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#10b981,#34d399)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body1">Resolved</Typography>
            </Box>
            <CheckCircleIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>

        {/* Rejected */}
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Box
            sx={{
              ...cardStyle,
              background: "linear-gradient(45deg,#ef4444,#f87171)",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
              <Typography variant="body1">Rejected</Typography>
            </Box>
            <CancelIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>
      </Grid>

      {/* File Complaint Button */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            px: 4,
            py: 1.2,
            fontSize: "16px",
            fontWeight: 600,
            borderRadius: "30px",
            background: "linear-gradient(45deg,#6366f1,#8b5cf6)",
            textTransform: "none",
            boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(45deg,#4f46e5,#7c3aed)",
              transform: "translateY(-3px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            },
          }}
          onClick={handleComplaintBtn}
        >
          File a Complaint
        </Button>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
