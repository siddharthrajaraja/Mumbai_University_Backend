var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/MumbaiUniversity',{useNewUrlParser:true ,  useUnifiedTopology: true });

const grievanceSchema=  mongoose.Schema({
    title:String,
    subtitle:String,
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
    documents:Array
})

const secretarySchema =mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number
})

const committeeSchema =mongoose.Schema({
    name:String,
    email:String,
    password:String    
})

const grievanceModel =mongoose.model("Grievances",grievanceSchema)
const studentModel =mongoose.model("Student",studentSchema)
const secretaryModel=mongoose.model("Secretary",secretarySchema)
const committeeModel=mongoose.model("Committee",committeeSchema)

module.exports={
    grievanceModel,studentModel,secretaryModel,committeeModel
}


