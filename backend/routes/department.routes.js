const express = require("express");

const routes = express.Router();

const { addDepartment, getAllDepartments, deleteDepartment, updateDepartment, totalDepartmentCount} = require("../controller/department.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

routes.post("/addDepartment", verifyToken,verifyAdmin,  addDepartment);
routes.get("/getAllDepartments", verifyToken, getAllDepartments);
routes.delete("/deleteDepartment/:id", verifyToken, verifyAdmin,  deleteDepartment );
routes.put("/updateDepartment/:id", verifyToken, verifyAdmin, updateDepartment);
routes.get("/totaldepartments", verifyToken, verifyAdmin, totalDepartmentCount);

module.exports = routes;
