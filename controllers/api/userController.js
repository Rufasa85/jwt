const express = require('express');
const router = express.Router();
const {User,Blog} = require('../../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtAuthMid = require("../../utlis/tokenAuth.js");

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        res.json(users);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.get("/profile",jwtAuthMid,async (req,res)=>{
    try {

        const me = await User.findOne({
            where:{
                id:req.user
            },
            include:[Blog]
        })
        res.json(me);
    } catch(err){
        console.log(err);
        res.status(500).json({err})
    }
})

router.post("/",(req,res)=>{
    User.create(req.body).then(dbUser=>{
        const token = jwt.sign({
            userId:dbUser.id
        },"turtledog",{
            expiresIn:"1h"
        })
        res.json({token,user:dbUser});
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        },
        include:[Blog]
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(404).json({msg:"invalid credentials"})
        }
        if(bcrypt.compareSync(req.body.password,foundUser.password)){
            const token = jwt.sign({
                userId:foundUser.id
            },"turtledog",{
                expiresIn:"1h"
            })
            return res.json({token,user:foundUser})
        } else {
            return res.status(401).json({msg:"invalid credentials"})
        }
    })
})

module.exports = router;