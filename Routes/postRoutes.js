const {grievanceModel,studentModel,secretaryModel,committeeModel}=require('../databaseSchema.js') 

module.exports.register =(req,res)=>{
    var fs =require('fs')
    var jsonfile=require('jsonfile')
    const file="./json/insertStudent.json"
    jsonfile.readFile(file).then(obj=>{
        console.log(obj)
        


    })

    res.send("Done")
    


}
