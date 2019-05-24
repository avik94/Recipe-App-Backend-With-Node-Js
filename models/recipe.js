const Sequelize = require('sequelize');
const sequelize = require('../connection');


const Recipe = sequelize.define('recipe', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    }
}) 

    

module.exports = Recipe;


