class Validation {
    
    static validateUser(name, image, description, ingredients) {

        return new Promise((resolve, reject) => {
            const recipeData = {
                name: {
                    values: name,
                    type: "string"
                },
                image: {
                    values: image,
                    type: "string"
                },
                description: {
                    values: description,
                    type: "string"
                }
            }
            // const ingredientData = ingredients; 
            const keys = Object.keys(recipeData);  // ["name" ,"price"]
            for (var i = 0; i < keys.length; i++) {
                if (recipeData[keys[i]].values === "" ) {
                    this.validate = true;           // 'this' importance
                    this.fieldName = [keys[i]];
                    break;
                } else {                    
                    if(recipeData[keys[i]].type === typeof(recipeData[keys[i]].values)){
                        this.validate = false;
                    }else{   
                        reject({errorMsg : "'"+keys[i]+"' Datatype should be "+"'"+recipeData[keys[i]].type+"'"})
                    }
                }
            }
            if (this.validate === true) {
                reject({ errorMsg: this.fieldName + " can not be empty!" });        
            }else{
                let avik = true;
                for (let ingredient of ingredients){                        
                    if(ingredient.name === "" || ingredient.ammount == ""){                        
                        reject("can not be blank!");
                    }                    
                    else{
                        if(typeof(ingredient.name) !== "string"
                        || typeof(ingredient.ammount) !== "number"){
                            reject("Check Datatype")
                        }else{
                            avik = false;                            
                        }                        
                    }                     
                }
                if(!avik){
                    resolve();
                }      
            }
            
            // ingredient test
            // [ { name: 'tandoor', ammount: 5 },
            //   { name: 'milk', ammount: 6 } ]
            // console.log(ingredient);
            
        })
    }

    
    static updateValidation(requestBody){
        return new Promise((resolve, reject)=>{
            let newObj = {}
            let propertyData = [{name: "product_name",type: "string"},
            {name: "price",type: "number"}] //[{name: "product_name",type: "string"}]
            let wrongPropertyMsg = false; 
            for (const ops of requestBody){
                for(const el of propertyData){
                    if(ops.property === el.name){
                        if(typeof(ops.value) === el.type){
                            newObj[ops.property] = ops.value   
                            wrongPropertyMsg = true; 
                        }else{
                            reject({msg: "Check 'Value' Datatype"})
                        }
                    }
                }
            }
            if(wrongPropertyMsg == false){
                reject({msg: "Wrong Property!!"})
            }else{
                resolve(newObj)
            }
        })
    }
}

module.exports = Validation