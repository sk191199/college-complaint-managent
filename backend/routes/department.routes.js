const express = require("express");

const router = express.Router();

const { addDepartment, getAllDepartments, deleteDepartment, updateDepartment} = require("../controller/department.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

router.post("/addDepartment", verifyToken,verifyAdmin,  addDepartment);
router.get("/getAllDepartments", verifyToken,verifyAdmin, getAllDepartments)
router.delete("/deleteDepartment/:id", verifyToken, verifyAdmin,  deleteDepartment )
router.put("/updateDepartment/:id", verifyToken, verifyAdmin, updateDepartment)

module.exports = routes;
