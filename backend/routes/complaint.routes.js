const express = require("express");

const router = express.Router();

const { raiseComplaint } = require("../controller/complaint.controller");
const { upload } = require("../middleware/upload")
const { verifyToken } = require("../middleware/auth.middleware")

// routes
r