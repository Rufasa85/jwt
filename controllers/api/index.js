const express = require('express');
const router = express.Router();
const userRoutes = require("./userController")
const blogRoutes = require("./blogController")

router.use("/users",userRoutes)
router.use("/blogs",blogRoutes)



module.exports = router;