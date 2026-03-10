const express = require("express");

const routes = express.Router();

const { addDepartment, getAllDepartments } = require("../controller/department.controller");
const { verifyToken } = require("../middleware/auth.middleware");

routes.post("/addDepartment", verifyToken, addDepartment);
routes.get("/getAllDepartments", verifyToken, getAllDepartments)

module.exports = routes;
