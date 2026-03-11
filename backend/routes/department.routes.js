const express = require("express");

const routes = express.Router();

const { addDepartment, getAllDepartments, deleteDepartment } = require("../controller/department.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

routes.post("/addDepartment", verifyToken, addDepartment);
routes.get("/getAllDepartments", verifyToken, getAllDepartments)
routes.delete("/deleteDepartment/:id", verifyToken, verifyAdmin,  deleteDepartment )

module.exports = routes;
