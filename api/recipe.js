const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const validation = require('../validation');
const checkAuth = require('./checkAuth');

router.get('/:id', checkAuth, async(req, res)=>{
    try{
        const findRecipe = await Recipe.findAll({attributes:['id','name','imageUrl','description'],where: {user_id:req.params.id}})
        const finalResult = [];
        for(let eachRecipe of findRecipe){
            const ingredients = await Ingredient.findAll({attributes:['name','ammount'],where: {recipeId:eachRecipe.id}});
            recipes = {
                name: eachRecipe.name,
                url: eachRecipe.imageUrl,
                description: eachRecipe.description,
                ingredient: ingredients
            }
            finalResult.push(recipes)
        }
        res.json(finalResult);
    }catch(err){
        res.status(500).json({error: err})
    }   
});

//for creating new recipe & Ingredience
router.post('/',checkAuth, async(req, res)=>{
    recipe = {
        name: req.body.name,
        imageUrl: req.body.url,
        description: req.body.description,
        user_id: req.body.user_id,
        ingredients: req.body.ingredient
    }
    // try{
    //     const validity = await validation.validateUser(recipe.name,recipe.imageUrl,recipe.description,recipe.ingredients);
    try{
        console.log(recipe.ingredients.length)
        if (recipe.ingredients.length <= 0){         // recipe without ingrdient
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description,
                user_id: recipe.user_id
            }
            const createRecipe = await Recipe.create(recipeData)
            res.status(200).json({mgs: "Recipe Created Succesfully"})
        }else{                                              // recipe with ingredients
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description,
                user_id: recipe.user_id
            }
            const createRecipe = await Recipe.create(recipeData)
            const allRecipeData = await Recipe.findAll();
            let length = allRecipeData.length;
            let index = allRecipeData[length-1].id;
            for (let ingredient of recipe.ingredients){
                ingredientData = {
                    name: ingredient.name,
                    ammount: ingredient.ammount,
                    recipeId: index
                }
                const createIngredient = await Ingredient.create(ingredientData);
            }
            res.status(200).json({mgs: "Recipe & Ingredients Created Succesfully"});
        }

    }catch(err){
        res.status(500).json({ err: err })
    }
    // }catch(err){
    //     res.json({msg: err})
    // }

    
})

// For Edit Recipe
router.post('/:id/:userid', async(req,res) => {
    const recipeId = +req.params.id;
    const userId = +req.params.userid;
    if(req.body.ingredient.length === 0){
        const exitsIngred = await Ingredient.findAll({where:{recipeId:recipeId}});
        if(exitsIngred.length !== 0){
            const destroy = await Ingredient.destroy({where:{recipeId:recipeId}});
        }
        recipe={
            name : req.body.name,
            description: req.body.description,
            imageUrl: req.body.url
        }
        console.log(recipeId,userId)
        const updateRecipe = await Recipe.update(recipe,{
            where:{
                id: recipeId,
                user_id: userId
            }
        })
        res.status(200).json({msg: "Updated!"})
    }
    else{
        recipe={
            name : req.body.name,
            description: req.body.description,
            imageUrl: req.body.url
        }
        const updateRecipe = await Recipe.update(recipe,{
            where:{
                id: recipeId,
                user_id: userId
            }
        })
        let ingredients = req.body.ingredient;
        const ingredientsData = await Ingredient.destroy({
            where:{
                recipeId: recipeId
            }
        })
        for (let eachIngredient of ingredients){
            eachIngredient.recipeId = recipeId;
            const addIngredients = await Ingredient.create(eachIngredient);
        }
        res.status(200).json({msg: "Updated!"})
    }
})
// For Edit Purpose
router.get('/:userId/:name', async(req,res)=>{
    const userId = req.params.userId;
    const name = req.params.name;
    const findId = await Recipe.findAll({
        attributes: ['id'],
        where:{
            name: name,
            user_id: userId
        }
      }) 
    res.json(findId[0].id);
})
// deleting only exiting recipe
router.delete('/delete/:userId/:recipeId', checkAuth, async(req,res) => {     
    // try{
        const getId = await Recipe.findAll({where: 
            {
                id: req.params.recipeId,
                user_id: req.params.userId
            } 
        });
        console.log(getId)
        if(getId.length === 0){
            res.status(500).json({msg: "Recipe Not Found"})
        }else{
            const deleteIngredient = await Ingredient.destroy({
                where:{
                    recipeId: req.params.recipeId
                }
            });
            const deleteRecipe = await Recipe.destroy({
                where:{
                    id: req.params.recipeId,
                    user_id: req.params.userId
                }
            });
            res.status(200).json({
                msg: "Recipe Deleted Successfully"
            })
        }
    // }catch(err){
    //     res.status(500).json({error: err});
    // }
});

module.exports = router;

