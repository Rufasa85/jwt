const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
  
    email: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false,
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }
},{
    sequelize,
    hooks:{
        beforeCreate:usr=>{
            usr.password = bcrypt.hashSync(usr.password,4);
            return usr
        }
    }
});

module.exports=User