const express = require('express');
const router = express.Router();
const userRoutes = require("./userController")

router.use("/users",userRoutes)

//TODO: add blog routes

module.exports = router;