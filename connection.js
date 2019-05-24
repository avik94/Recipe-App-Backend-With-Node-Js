const Sequelize = require('sequelize');

const sequelize = new Sequelize('recipe-app', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports= sequelize;  