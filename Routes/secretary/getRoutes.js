var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.display=async (req,res)=>{
    console.log(req.sessionID)
    console.log("access-token:", req.headers['x-access-token'],"user type :", req.headers.usertype)
    try{
        if(req.headers['usertype']==="secretary")
            {   
                flag=1
                var grievances=await grievanceModel.find({}).sort({'timestamp':1})
                res.json({grievances,msg:'Grievances fetched succesfully'})
                console.log(grievances)
            }
    }
    catch(err){
        res.status(400).send({
            error:'Could not fetch grievances'
        })
    }
    
}

var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.selected_grievances=async (req,res)=>{
    try{
        console.log("vinay ne bheja",req.headers['usertype'])
        // if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="committee")
        if(req.headers['usertype']==="committee" || req.headers['usertype']==="secretary")
        {
            var grievances_status_0= await grievanceModel.find({status:0}).sort({'timestamp':1})
            res.json(grievances_status_0)
            console.log(grievances_status_0)
        }
    }
    catch(err){
        res.status(400).send({
            error:'Could not fetch grievances which are under process'
        })
    }

}