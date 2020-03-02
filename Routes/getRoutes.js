var {secretaryModel,committeeModel}=require('../databaseSchema.js')

module.exports.register=(req,res)=>{
        res.render('register')
}

module.exports.login=(req,res)=>{
    
    res.render('login')
    
}

module.exports.done=(req,res)=>{
    //console.log(req)
    try{

        console.log( Object.keys(req.session['passport']))

    console.log("harami",req.session['passport'])
    console.log("harami",req.session['passport']['user']['name'])
    console.log("harami",req.session['passport']['user']['email'])
    console.log("harami",req.session['passport']['user']['mobile'])
    console.log("harami",req.session['passport']['user']['type'])
    var temp1=req.session['passport']['user']['type']

    if(temp1=='secretary'){
        res.render('secretary.ejs')
    

    }

    else if (temp1=='committee'){
        res.render('committee.ejs')
    }

    else {
        res.render('student.ejs')
    }
    console.log( "Done mwin hu re " ,req.sessionID)
        //res.send("Done")
//sec_passw
   
    }
    catch{
        res.redirect('/login')
    }
   
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
                    element["type"]="secretary"
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
                    element["type"]="committee"
                    console.log("Chutiya chala gaya",element["name"])
                    committeeModel(element).save(()=>{console.log("Object added");})
        
                })

            })
            

        });
        

    })

    



}
