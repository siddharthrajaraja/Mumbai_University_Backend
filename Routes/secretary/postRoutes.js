var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')
module.exports.under_process=async (req,res)=>{
    console.log(req.sessionID)
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="secretary")
        {
            console.log(req.params.id)
            var grievance=await grievanceModel.findByIdAndUpdate({_id:req.params.id},{status:0,final_date_of_resolving:req.body.date},(err,res)=>{console.log("Forwarded to commitee")})
            res.redirect('/secretary/display')
            
            
        }
    }
    catch(err){
        res.redirect('/login')
    }
}


module.exports.commit=async (req,res)=>{
    console.log(req.sessionID)
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="secretary")
        {
            console.log(req.params.id,req.body)
            var grievance=await grievanceModel.findByIdAndUpdate({_id:req.params.id},{status:1,finalDecision:req.body.finalDecision},(err,res)=>{
                    var {mail}=require('../../Nodemailer/mail')
                    console.log("Commited by Secretary");
                    console.log(res)
                    console.log(res.from)
                    mail('darkp251099@gmail.com',res.from,'Print PDF','Click to print',`${req.body.finalDecision}\n<a href="http://localhost:9900/print_pdf/${req.params.id}"> Click me to print  </a>`)
                    console.log("Mail sended")
                })
            res.redirect('/secretary/display')
            
            
        }
    }
    catch(err){
        res.redirect('/login')
    }
}