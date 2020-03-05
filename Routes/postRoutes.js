var {mail}=require('../Nodemailer/mail.js')
const {grievanceModel,studentModel,secretaryModel,committeeModel}=require('../databaseSchema.js') 
//console.log(grievanceModel)
var session=require('express-session')

module.exports.logout=(req,res)=>{
    try{
        req.session.destroy(()=>{
            console.log( "session ended" ,req.sessionID)  
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
                if(data==null){ 
                    req.body['isVerified']=0
                    console.log(req.body)
                        
                    studentModel(req.body).save(()=>{
                        console.log("Object added");
                        studentModel.find({email:req.body.email},(err,data)=>{
                            if(err)throw err;
                           var object_id=data[0]["_id"]
                           console.log(object_id)
                           path="http://localhost:9900/verify/"+object_id
                           tag="<a href='"+path+"'>Click this link to verify your email. </a>"
                           mail('darkp251099@gmail.com',req.body.email,'Verification','Click the given link to verify your email',tag)
                            
                        })
                        res.send("verification sent");
                        
                    })}
            else {console.log("invalid");res.send("Email ID already exists")}
            
            })
           
        })
    })

    
}
