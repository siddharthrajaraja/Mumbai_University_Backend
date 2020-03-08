var {secretaryModel,committeeModel,studentModel}=require('../databaseSchema.js')

module.exports.register=(req,res)=>{
        res.render('register')
}

module.exports.login=(req,res)=>{
    
    res.render('login')
    
}
module.exports.verify = (req, res ) => {
    console.log("Aaa gaya mein hone verify: "+req.params.id)

    studentModel.findByIdAndUpdate({"_id":req.params.id},{"isVerified":1},(err,data)=>{console.log("Verify ho gaya Laude")})
    // res.send('Email-Id Verified');
    res.redirect('http://localhost:3000/login')
}
module.exports.upload=(req,res)=> {
    try{
        
        if(typeof(req.sessionID)!=undefined){
            console.log("uploads mein hu", req.sessionID)
            console.log("harami",req.session['passport'])
            console.log("harami",req.session['passport']['user']['name'])
            console.log("harami",req.session['passport']['user']['email'])
            console.log("harami",req.session['passport']['user']['mobile'])
            console.log("harami",req.session['passport']['user']['type'])
           
            res.render('upload')
        
        }
    }
    catch{
        res.redirect('/login')
    }
}

module.exports.done=(req,res)=>{
    
    try{

    console.log(req.cookies)
    console.log(Object.keys(req.session['passport']))

    console.log("harami",req.session['passport'])
    console.log("harami",req.session['passport']['user']['name'])
    console.log("harami",req.session['passport']['user']['email'])
    console.log("harami",req.session['passport']['user']['mobile'])
    console.log("harami",req.session['passport']['user']['type'])
    var temp1=req.session['passport']['user']['type']

    if(temp1=='secretary'){
        //res.render('secretary.ejs')
        res.json({
            usertype:'secretary',
            token:req.sessionID
        })

    }

    else if (temp1=='committee'){
       // res.render('committee.ejs')
        // res.redirect('/selected_grievances')
        res.json({
            usertype:'committee',
            token:req.sessionID
        })
    }

    else {
        // res.render('student.ejs')
        res.json({
            usertype:'student',
            token:req.sessionID
        })
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
