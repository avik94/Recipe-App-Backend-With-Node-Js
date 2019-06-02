const express = require('express');
const app = express();
var cors = require('cors')
const sequelize = require('./connection');
const Recipe = require('./models/recipe')
const Ingredient = require('./models/ingredient');
const User = require('./models/user');
const routerRecipe = require('./api/recipe');
const authRouter = require('./api/auth');
const bodyParsor = require('body-parser');
app.use(bodyParsor.urlencoded({extended: false}))
app.use(bodyParsor.json())
app.use(cors());


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
app.use('/recipe', routerRecipe);
app.get('/database', (req, res)=>{
  setTimeout(()=>{
    User.sync();
  },2000);
  setTimeout(()=>{
    Recipe.sync();
  },3000);
  setTimeout(()=>{
    Ingredient.sync();
  },4000);
  setTimeout(()=>{
    res.status(200).json({
      mgs: "I just Start Myself jarvis"
  })
  },5000);  
});
app.use('/',authRouter);
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