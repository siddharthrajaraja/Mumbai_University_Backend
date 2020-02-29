const mongoose=require("mongoose")
const Schema=mongoose.Schema;

var User=new Schema({
    email:{
        required:true,
        type:String
    }
})

//export:

User=mongoose.model("User",User)
module.exports=User;