const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");

const { User } = require("../models");
const jwtAuthMid = require("../utlis/tokenAuth.js");

router.get("/", (req, res) => {
  res.send("hello!");
});
//TODO: create protected route

router.get("/secretclub", jwtAuthMid, (req, res) => {
  User.findOne({
    where: {
      id:req.user
    }
  })
    .then(user => {
      return res.json({ msg: `Welcome to the club, ${user.email}!` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.use("/api", apiRoutes);

module.exports = router;
