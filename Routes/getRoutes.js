var {secretaryModel,committeeModel}=require('../databaseSchema.js')

module.exports.register=(req,res)=>{
        res.render('register')
}

module.exports.login=(req,res)=>{
    
    res.render('login')
}

module.exports.done=(req,res)=>{
    //console.log(req)
    //console.log( "Done mwin hu re " ,req.sessionID)
        res.send("Done")
}



module.exports.readFile =(req,res)=>{
    var bcrypt=require('bcrypt')
    var fs =require('fs')
    var jsonfile=require('jsonfile')
    var file="./json/insertSecretary.json"
    var saltRounds=5
    jsonfile.readFile(file).then(obj=>{
        //console.log(obj,"ok")
        obj.forEach(element => {
            
            bcrypt.genSalt(saltRounds,(err,salt)=>{

                bcrypt.hash(element["password"],salt,(err,hash)=>{
                    
                    //console.log(element["name"],"has passsword ",hash)
                    element["password"]=hash
                    console.log("Chutiya chala gaya",element["name"])
                    secretaryModel(element).save(()=>{console.log("Object added");})
        
                })

            })
            

        });
        

    })

    file="./json/insertCommittee.json"
    jsonfile.readFile(file).then(obj=>{
        //console.log(obj,"ok")
        obj.forEach(element => {
            
            bcrypt.genSalt(saltRounds,(err,salt)=>{

                bcrypt.hash(element["password"],salt,(err,hash)=>{
                    
                    //console.log(element["name"],"has passsword ",hash)
                    element["password"]=hash
                    console.log("Chutiya chala gaya",element["name"])
                    committeeModel(element).save(()=>{console.log("Object added");})
        
                })

            })
            

        });
        

    })

    



}
