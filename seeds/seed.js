const sequelize = require("../config/connection");

const {User,Blog} = require("../models");

const seedFunc = async ()=>{
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([{
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
    const blogs = await Blog.bulkCreate([{
        title:"My first blog!",
        body:"omg this is so exicting!",
        UserId:1
    },
    {
        title:"My last blog",
        body:"omg this is not so exciting",
        UserId:1
    },
    {
        title:"Welcome to my web blog",
        body:"lol what is internet",
        UserId:2
    },
])
    console.log("seeded!")
    process.exit(0)
}

seedFunc();