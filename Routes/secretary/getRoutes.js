var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.display=async (req,res)=>{
    console.log(req.sessionID)
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="secretary")
        {
            var grievance_untouched=await grievanceModel.find({status:-1})
            var grievance_under_process=await grievanceModel.find({status:0})
            var grievance_recieved=await grievanceModel.find({isComment:1})
            var grievances=await grievanceModel.find({}).sort({'timestamp':1})
            res.render('secretary.ejs',{array_of_selections:grievances,grievance_untouched,grievance_under_process,grievance_recieved})
        
        }
    }
    catch(err){
        res.redirect('/login')
    }


}




var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.selected_grievances=async (req,res)=>{
    try{
        if(typeof(req.sessionID)!=undefined &&  (req.session['passport']['user']['type']=="committee")||req.session['passport']['user']['type']=="secretary")
        {
            var grievances_status_0=await grievanceModel.find({status:0}).sort({'timestamp':1})
            res.json(grievances_status_0)
        
        }
    }
    catch(err){
        res.redirect('/login')
    }

}








// module.exports.grievances_status=async (req,res)=>{
//     console.log(req.sessionID)
//     try{
//         if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="secretary")
//         {
            
//             res.render('secretary.ejs',{

//             })
        
//         }
//     }
//     catch(err){
//         res.redirect('/login')
//     }


// }
