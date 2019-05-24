const express = require('express');
const app = express();
const sequelize = require('./connection');
const Recipe = require('./models/recipe')
const Ingredient = require('./models/ingredient');
const routerRecipe = require('./api/recipe');
const bodyParsor = require('body-parser');
app.use(bodyParsor.urlencoded({extended: false}))
app.use(bodyParsor.json())


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
app.use('/recipe', routerRecipe);
app.use('/database', (req, res)=>{
    Recipe.sync();
    Ingredient.sync();
    res.status(200).json({
        mgs: "I just Start Myself jarvis"
    })
});
app.use((req, res,next) =>{
    const err = new Error("Page Not Found!");
    next(err)
});
app.use((err,req, res,next) =>{
    res.status(404).json({
        err:err.message
    })
})
module.exports = app;