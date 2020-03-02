var multer = require('multer')

var fs =require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        email_id=req.session['passport']['user']['email'].split('@')[0]
        console.log(email_id)

        var directory=__dirname+'/uploads/'+email_id
        if(!fs.existsSync(directory))
            fs.mkdirSync(directory)
        cb(null, directory)
    
     },
    filename: function (req, file, cb) {

      cb(null, file.originalname + '-' + Date.now())
    }
  })


  var uploads = multer({ storage: storage })
module.exports={uploads}
