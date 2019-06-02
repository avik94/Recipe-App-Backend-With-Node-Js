const Sequelize = require('sequelize');
const sequelize = require('../connection');
const User =  require('./user');


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
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id'
        }
    }
}) 

    

module.exports = Recipe;


