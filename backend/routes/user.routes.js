const express = require("express")

const routes = express.Router();

const {createUser, loginUser, getProfile, verifyEmail, changePassword} = require("../controller/user.controller");
const { verifyToken } = require("../middleware/auth.middleware")

routes.post("/create-user", createUser)
routes.post("/login", loginUser);
// verify if email exists (no auth required)
routes.post("/verify-email", verifyEmail);
// change password without login (could be enhanced with token)
routes.post("/change-password", changePassword);
routes.get("/getprofile", verifyToken, getProfile )

module.exports = routes