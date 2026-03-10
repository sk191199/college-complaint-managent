const express = require("express")

const routes = express.Router();

const { addDepartment} = require("../controller/department.controller")
const { verifyToken } = require("../middleware/auth.middleware")

routes.post("/addDepartment",  addDepartment)


module.exports = routes