const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    // try{
        const fullToken = req.headers.authorization;
        console.log(fullToken)
        const arrToken = fullToken.split(" ");
        const token = arrToken[1];
        jwt.verify(token, 'Recipe_Secret', function(err, decoded) {
            if(err){
                res.status(200).json({msg: "Auth Fails"})
            }else{
                console.log(token)
                next();             
            }
        });
    // }catch(err){
    //     res.json({msgs: "Auth Fails"})
    // }
}