var {mail}=require('../Nodemailer/mail.js')
const {grievanceModel,studentModel,secretaryModel,committeeModel}=require('../databaseSchema.js') 
//console.log(grievanceModel)
var session=require('express-session')


module.exports.logout=(req,res)=>{
    try{
        req.session.destroy(()=>{
            console.log( "Kahtm hua session " ,req.sessionID)  
          }) 
        
    }
    catch{
    
    }
    res.redirect('/login')
    
      
            
}

module.exports.register =(req,res)=>{
    
    
    var bcrypt=require('bcrypt')
    const saltRounds=5
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{

            console.log(req.body.password,hash)
            req.body.password=hash;
            req.body.type="student";
            studentModel.findOne({email:req.body.email},(err,data)=>{
                if(err) throw err;
                if(data==null){ studentModel(req.body).save(()=>{console.log("Object added");res.send("Aaa gaay bc");mail('darkp251099@gmail.com',req.body.email,'Verification','Click the given link to verify your email',`<a href='http://localhost:9900/login'>Click Here!</a>`)})}
            else {console.log("invalid");res.send("Email ID already exists")}
            
            })
           
        })
    })

    
}
