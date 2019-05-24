const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Recipe = require('./recipe');

Ingredients = sequelize.define('ingredients', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    ammount:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    recipeId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Recipe,
            key: 'id'
        }
    }
}) 

module.exports = Ingredients;