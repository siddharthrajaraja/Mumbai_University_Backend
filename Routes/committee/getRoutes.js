var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.selected_grievances=async (req,res)=>{
    console.log(req.params.id)
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="committee")
        {
            var grievances_status_0=await grievanceModel.find({status:0}).sort({'timestamp':1})
            res.render('selected_grievances',{array_of_selections:grievances_status_0})
            //res.json(grievances_status_0)
        
        }
    }
    catch(err){
        res.redirect('/login')
    }

}