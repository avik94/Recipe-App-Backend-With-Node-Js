const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async(req,res)=>{
    
    const checkEmail = await User.findAll({where:{email: req.body.email}});
    if(checkEmail.length === 0){
        var hash = bcrypt.hashSync(req.body.password, 10);
        userdata = {
            name: req.body.name,
            email: req.body.email,
            password: hash 
        }
        try{
            const storeUser = await User.create(userdata);
            res.json({msg:"Data Stored"})
        }catch(err){
            res.status(500).json({msg: err});
        }
    }else{
        res.status(200).json({ msg: "Already Registerd Member"})
    }

})

router.post('/login', async(req,res)=>{
    
    const checkEmail = await User.findAll({where:{email: req.body.email}});
    console.log(checkEmail.length)
    if(checkEmail.length !== 0){
        bcrypt.compare(req.body.password, checkEmail[0].password).then(function(result) {
            if(result){
                var token = jwt.sign({ value: 'Jarvis' }, 'Recipe_Secret');
                res.status(200).json({token:token,id:checkEmail[0].id})
                      
            }else{
                res.json({msg: "Wrong Password"});
            }
        });
    }else{
        res.status(200).json({msg: "Please Sign In First"})
    }

})
module.exports = router;