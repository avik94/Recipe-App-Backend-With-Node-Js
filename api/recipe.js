const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

router.get('/', async(req, res)=>{
    // try{
    //     const recipeData = await Recipe.findAll(); 
    //     let x = recipeData.map(el =>{   //[1,2,3,4]
    //         return el
    //     })
    //     console.log(x)
    //     result = [];
    //     for(let i of x){
    //         console.log(i)
    //         const ingredient = await Ingredient.findAll({where:{recipeId: i}});
    //         response = {
    //             name: recipeData[i].name,
    //             imageUrl: recipeData[i].imageUrl,
    //             description: recipeData[i].description,
    //             ingredients: ingredient
    //         }            
    //         result.push(response)
    //     }
    //     res.json(result)
        
    // }catch(err){
    //     res.status(500).json({
    //         error:err
    //     })
    // }
});

//for creating new recipe & Ingredience
router.post('/', async(req, res)=>{
    recipe = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        ingredients: req.body.ingredients
    }    
    try{
        if (req.body.ingredients.length <= 0){         // recipe without ingrdient
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description
            }
            const createRecipe = await Recipe.create(recipeData)
            res.status(200).json({mgs: "Recipe Created Succesfully"})
        }else{                                              // recipe with ingredients
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description
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
})

// For Edit Recipe
router.post('/:id', async(req,res) => {
    recipe = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        ingredients: req.body.ingredients
    } 
    try{
        if(req.body.ingredients.length <= 0 ){           // only update the recipe with edit
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description
            }
            const updateRecipe = await Recipe.update(recipeData, {
                where: {
                  id: req.params.id
                }
              });
            res.status(200).json({ msg: "Recipe Updated Successfully"});
        }else{                                         // update with ingredients with edit
            recipeData = {
                name: recipe.name,
                imageUrl: recipe.imageUrl,
                description: recipe.description
            }
            const updateRecipe = await Recipe.update(recipeData, {
                where: {
                  id: req.params.id
                }
              });
            const findRelatedIngredients = await Ingredient.findAll({
                where:{
                    recipeId: req.params.id
                }
            });
            if(recipe.ingredients.length === findRelatedIngredients.length ){ //update if not ingredient add dynamically
                let i = findRelatedIngredients[0].id;
                for (let ingredient of recipe.ingredients) {
                    if(i === findRelatedIngredients.length+1){
                        break;
                    }else{
                        ingredientData  = {
                            name: ingredient.name,
                            ammount: ingredient.ammount
                        }
                        console.log(ingredientData)
                        const updateIngredients = await Ingredient.update(ingredientData, {
                            where: {
                            recipeId: req.params.id,
                            id: i     
                            }
                        });
                        i++
                    }
                }
            }else{                                                       // update if ingredient add dynamically
                const deleteData = await Ingredient.destroy({
                    where:{
                        recipeId: req.params.id
                    }
                });
                for (let ingredient of recipe.ingredients){
                    ingredientData = {
                        name: ingredient.name,
                        ammount: ingredient.ammount,
                        recipeId: req.params.id
                    }
                    const createIngredient = await Ingredient.create(ingredientData);
                }
            }
            
            res.status(200).json({msg: "Recipe And Ingredients Updated Succesfully"})
        }
    }catch(err){
        res.status(500).json({err: err})
    }
})

router.post('/delete/:id', async(req,res) => {     
    try{
        const deleteIngredient = await Ingredient.destroy({
            where:{
                recipeId: req.params.id
            }
        });
        const deleteRecipe = await Recipe.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: "Recipe Deleted Successfully"
        })
    }catch(err){
        res.status(500).json({error: err});
    }
});

module.exports = router;

