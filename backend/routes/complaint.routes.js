const express = require("express");

const routes = express.Router();

const { raiseComplaint } = require("../controller/complaint.controller");
const { upload } = require("../middleware/upload")
const { verifyToken } = require("../middleware/auth.middleware")

// routes
routes.post("/raiseComplaint", verifyToken, upload.single("image"), raiseComplaint);

module.exports = routes