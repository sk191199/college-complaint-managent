const express = require("express");

const routes = express.Router();

const { addDepartment, getAllDepartments, deleteDepartment, updateDepartment} = require("../controller/department.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

routes.post("/addDepartment", verifyToken,verifyAdmin,  addDepartment);
routes.get("/getAllDepartments", verifyToken,verifyAdmin, getAllDepartments)
routes.delete("/deleteDepartment/:id", verifyToken, verifyAdmin,  deleteDepartment )
routes.put("/updateDepartment/:id", verifyToken, verifyAdmin, updateDepartment)

module.exports = routes;
