const {grievanceModel,studentModel,secretaryModel,committeeModel}=require('../databaseSchema.js') 
//console.log(grievanceModel)
module.exports.register =(req,res)=>{
    
    var bcrypt=require('bcrypt')
    const saltRounds=5
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{

            console.log(req.body.password,hash)
            req.body.password=hash;
            studentModel.findOne({email:req.body.email},(err,data)=>{
                if(err) throw err;
                if(data==null){ studentModel(req.body).save(()=>{console.log("Object added");res.send("Aaa gaay bc")})}
            else {console.log("invalid");res.send("Invalid")}
            
            })
           
        })
    })

    
}
