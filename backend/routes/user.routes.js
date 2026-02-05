const express = require("express")

const routes = express.Router();

const {createUser} = require("../controller/user.controller")

routes.post("/create-user", createUser)

module.exports = routes