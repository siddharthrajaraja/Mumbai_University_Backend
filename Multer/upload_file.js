var {grievanceModel}=require('../databaseSchema.js')
var multer = require('multer')

var fs =require('fs')

var storage =  multer.diskStorage({
    destination: async (req, file, cb)=> {
       var email_id=req.session['passport']['user']['email'].split('@')[0]
        var directory=__dirname+'/uploads/'+email_id
        if(!fs.existsSync(directory)){
          fs.mkdirSync(directory)
        }

        grievanceModel.collection.countDocuments({from:req.session['passport']['user']['email']},(err,count)=>{
          console.log(count)
          var directory=__dirname+'/uploads/'+email_id+'/grievance'+String(count+1);
          console.log(directory)
          if(!fs.existsSync(directory))
            {
              fs.mkdirSync(directory)
               cb(null, directory)
    
            }
            else{
              cb(null,directory)
            }
        })

            
     },
    filename: async function (req, file, cb) {
     // console.log(file.originalname)
     
    await  cb(null, file.originalname + '-' + Date.now())
    }
  })


  var uploads = multer({ storage: storage })
module.exports={uploads}
