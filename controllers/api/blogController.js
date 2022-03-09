const express = require("express");
const router = express.Router();
const { User, Blog } = require("../../models");
const jwt = require("jsonwebtoken");
const jwtAuthMid = require("../../utlis/tokenAuth.js");

router.get("/", (req, res) => {
  Blog.findAll({
    include: [User]
  })
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/", jwtAuthMid, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user
    });
    return res.json(newBlog);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
});

module.exports = router;
