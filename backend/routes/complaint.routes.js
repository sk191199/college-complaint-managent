const express = require("express");

const routes = express.Router();

const { raiseComplaint, getAllComplaints , updateComplaintStatus} = require("../controller/complaint.controller");
const { upload } = require("../middleware/upload")
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware")

// routes
routes.post("/raiseComplaint", verifyToken, upload.single("image"), raiseComplaint);
routes.get("/complaints", verifyToken, getAllComplaints );
routes.put("/complaint/:id", verifyToken, verifyAdmin, updateComplaintStatus);

module.exports = routes