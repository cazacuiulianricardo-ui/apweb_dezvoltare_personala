const { DataTypes } = require("sequelize");
const sequelize=require("../db");

const Test=sequelize.define('Test',{
    idTest:{
     type:DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true
    },
    nume:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
