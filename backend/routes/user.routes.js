const express = require("express")

const routes = express.Router();

const {createUser, loginUser, getProfile, verifyEmail, changePassword, getAllUsers, deleteUser} = require("../controller/user.controller");
const { verifyToken , verifyAdmin} = require("../middleware/auth.middleware")

routes.post("/create-user", createUser)
routes.post("/login", loginUser);
// verify if email exists (no auth required)
routes.post("/verify-email", verifyEmail);
// change password without login (could be enhanced with token)
routes.post("/change-password", changePassword);
routes.get("/getprofile", verifyToken, getProfile )
routes.get("/getallusers", verifyToken, verifyAdmin, getAllUsers);
routes.delete("/deleteuser", verifyToken, verifyAdmin, deleteUser)

module.exports = routes