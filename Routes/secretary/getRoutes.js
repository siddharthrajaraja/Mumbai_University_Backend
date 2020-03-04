var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.display=async (req,res)=>{
    console.log(req.sessionID)
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="secretary")
        {
            var grievances=await grievanceModel.find({}).sort({'timestamp':1})
            res.json(grievances)
        
        }
    }
    catch(err){
        res.redirect('/login')
    }


}




var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.selected_grievances=async (req,res)=>{
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="committee")
        {
            var grievances_status_0=await grievanceModel.find({status:0}).sort({'timestamp':1})
            res.json(grievances_status_0)
        
        }
    }
    catch(err){
        res.redirect('/login')
    }

}