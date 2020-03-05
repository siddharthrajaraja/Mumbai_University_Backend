var {secretaryModel,committeeModel,studentModel,grievanceModel}=require('../../databaseSchema.js')

module.exports.comment=async (req,res)=>{
    try{
        if(typeof(req.sessionID)!=undefined &&  req.session['passport']['user']['type']=="committee")
            {   console.log(req.body)
                id=Object.keys(req.body)[0]
                comment=Object.values(req.body)[0]
                console.log("harami",req.session['passport'])
                console.log("harami",req.session['passport']['user']['name'])
                console.log("harami",req.session['passport']['user']['email'])
                console.log("harami",req.session['passport']['user']['mobile'])
                console.log("harami",req.session['passport']['user']['type'])
                
                var suggestion_object={
                    sender:req.session['passport']['user']['name'],
                    sender_mail:req.session['passport']['user']['email'],
                    comment:comment,
                    timestamp:Date.now()

                }

                console.log(suggestion_object)
                grievanceModel.find({'_id':id},(err,data)=>{
                    if (err) throw err;
                    console.log(data[0])
                    var existed_suggestions=data[0]['suggestion']
                    if(existed_suggestions.length==0)existed_suggestions.push(suggestion_object)
                    else{
                        existed_suggestions.push(suggestion_object)
                    }

                    console.log(existed_suggestions)
                    
                    grievanceModel.findOneAndUpdate({_id:id},{suggestion:existed_suggestions , isComment:1},()=>{console.log
                    ("Added")},
                    
                    )


                })
            }
    }
    catch(err){
        res.redirect('/login')
    }

}