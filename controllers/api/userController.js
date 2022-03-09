const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        res.json(users);
    }).catch(err=>{
        console.log(err);
        res.json({err})
    })
})

router.post("/",(req,res)=>{
    User.create(req.body).then(dbUser=>{
        res.json(dbUser);
    }).catch(err=>{
        console.log(err);
        res.json({err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid credentials"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.json(foundUser)
        } else {
            return res.status(401).json({msg:"invalid credentials"})
        }
    })
})

module.exports = router;