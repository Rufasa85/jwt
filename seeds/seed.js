const sequelize = require("../config/connection");

const {User} = require("../models");

const seedFunc = async ()=>{
    await sequelize.sync({force:true});
    const users = User.bulkCreate([{
        email:"joe@joe.com",
        password:"password",
    },{
        email:"bahamut@joe.com",
        password:"meowmeow",
    },{
        email:"shiva@joe.com",
        password:"purrpurr",
    }],{
        individualHooks:true
    })
    console.log("seeded!")
    process.exit(0)
}

seedFunc();