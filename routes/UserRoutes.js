const express = require("express")

const userController = require("../Controllers/UserController");
const checkAuth = require("../middleware/checkAuth");

const userRoutes = express.Router();

userRoutes.post("/register",userController.createUser)

userRoutes.get("/login/:mobileNumber",userController.loginUser);

userRoutes.get("/chekout/:mobileNumber",userController.checkout)


module.exports = userRoutes