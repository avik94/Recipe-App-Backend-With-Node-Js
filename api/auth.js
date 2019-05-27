const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

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
        res.status(409).json({ msg: "Already Registerd Member"})
    }

})

router.post('/signin', async(req,res)=>{
    
    const checkEmail = await User.findAll({where:{email: req.body.email}});
    if(checkEmail.length !== 0){
        bcrypt.compare(req.body.password, checkEmail[0].password).then(function(result) {
            if(result){
                res.json({msg: "Welcome"});
                // here user will get jwt 
            }else{
                res.json({msg: "Wrong Password"});
            }
        });
    }else{
        res.status(500).json({msg: "Please Sign In First"})
    }

})
module.exports = router;