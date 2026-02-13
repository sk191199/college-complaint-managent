const express = require("express")

const routes = express.Router();

const {createUser, loginUser, getProfile} = require("../controller/user.controller");
const { verifyToken } = require("../middleware/auth.middleware")

routes.post("/create-user", createUser)
routes.post("/login", loginUser);
routes.get("/getprofile", verifyToken, getProfile )

module.exports = routes