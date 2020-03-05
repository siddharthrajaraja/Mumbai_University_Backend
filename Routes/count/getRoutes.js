var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.grievance_count=async (req,res)=>{
    console.log(req.sessionID)
    try{
        
        var grievance_minus1=await grievanceModel.find({status:-1})
        var grievance_0=await grievanceModel.find({status:0})
        var grievance_1=await grievanceModel.find({status:1})
        // res.json({
        //     grievance_minus1,
        //     grievance_0,
        //     grievance_1
        // })
        
        console.log(grievance_minus1,grievance_0,grievance_1)
        
    }
    catch(err){
        console.log(err)
    }
}