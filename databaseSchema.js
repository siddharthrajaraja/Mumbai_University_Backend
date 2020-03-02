var mongoose = require('mongoose')
var keys=require("./keys/keys.js")
//console.log(keys.mongodb.cloudURL)

mongoose.connect(keys.mongodb.localURL,{useNewUrlParser:true ,  useUnifiedTopology: true });

const grievanceSchema=  mongoose.Schema({
    title:String,
    subtitle:String,
    documents:Array,
    from:String,    // This is email_id of Student who raises grievance
    status:Number,  // Either -1/0/1  
    decription:String,  // This is message enclosed in grievance
    suggestion:Array,  // This is array of suggestion which comprises of comments by committee members
    /* 
        [{
            comment:String,
            by:String,        // mail id of committee member who comments
            timestamp:Date
        },{},...]
    */
    timestamp:Date
})

const studentSchema = mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    college:String,
    rollNo:String,
    gender:String,
    password:String,
    type:String
})

const secretarySchema =mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number,
    type:String
})

const committeeSchema =mongoose.Schema({
    name:String,
    email:String,
    password:String,
    type: String 
})



var userSchema=mongoose.Schema({
    email:String
})

const grievanceModel =mongoose.model("Grievances",grievanceSchema)
const studentModel =mongoose.model("Student",studentSchema)
const secretaryModel=mongoose.model("Secretary",secretarySchema)
const committeeModel=mongoose.model("Committee",committeeSchema)
const userModel=mongoose.model('user',userSchema);

module.exports={
    grievanceModel,studentModel,secretaryModel,committeeModel,userModel
}


