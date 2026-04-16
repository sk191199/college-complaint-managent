const express = require("express");

const routes = express.Router();

const { raiseComplaint, getAllComplaints , updateComplaintStatus, getComplaintCount, getAllComplaintsByUser, getComplaintCountByUser, getDepartmentWiseComplaintsCount} = require("../controller/complaint.controller");
const { upload } = require("../middleware/upload")
const { verifyToken, verifyAdmin , verifyStudent} = require("../middleware/auth.middleware")

// routes
routes.post("/raiseComplaint", verifyToken, upload.single("image"), raiseComplaint);
routes.get("/complaints", verifyToken, getAllComplaints );
routes.put("/complaint/:id", verifyToken, verifyAdmin, updateComplaintStatus);
routes.get("/complaintcounts", verifyToken, verifyAdmin, getComplaintCount);
routes.get("/usercomplaints", verifyToken, verifyStudent,  getAllComplaintsByUser);
routes.get("/complaintscountbyuser", verifyToken, verifyStudent, getComplaintCountByUser);
routes.get("/departmentwisecomplaints", verifyToken, verifyAdmin, getDepartmentWiseComplaintsCount)
module.exports = routes