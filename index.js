var  express=require('express')
var app =express()
var bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors')
var cookieParser=require('cookie-parser')

var session=require('express-session')
var flash=require('connect-flash')
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


var {passportLocal}=require('./Passport/passport-config')
passportLocal(passport);

var cookieSession = require('cookie-session')


// Middle-wares and Templating Engines --------------------------------

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
    secret:"LAuda",
    saveUninitialized:true,
    resave:true
}))

app.use(flash())
app.use(cookieParser())




// These are get Routes -------------------------------------------------

var {register,login,readFile,done,upload,verify,print_pdf}=require('./Routes/getRoutes')
var {display}=require('./Routes/secretary/getRoutes')
var {selected_grievances}=require('./Routes/committee/getRoutes')
var {grievance_count}=require('./Routes/count/getRoutes')

app.get('/register',register);
app.get('/login',login)
app.get('/readFile',readFile)
app.get('/done',done)
app.get('/upload',upload);
app.get('/verify/:id',verify);
app.get('/secretary/display',display)
app.get('/sel_griev/:id',selected_grievances)
app.get('/selected_grievances',selected_grievances)
app.get('/grievance_count',grievance_count)
app.get('/print_pdf/:id',print_pdf)



// These are post Routes ------------------------------------------------
var {register,logout}=require('./Routes/postRoutes')
var {comment}=require('./Routes/committee/postRoutes')
var {under_process,commit}=require('./Routes/secretary/postRoutes.js')


app.post('/under_process/:id',urlencodedParser,under_process)
app.post('/commit/:id',urlencodedParser,commit)
app.post('/register',urlencodedParser,register)

app.post('/logout',logout)
app.post('/comment',urlencodedParser,comment)
// app.post('/login', passport.authenticate('local-signup', {
//     successRedirect : '/done', // redirect to the secure profile section
//     failureRedirect : '/login', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// })(req,res,next)

// );

app.post('/login',urlencodedParser,(req,res,next)=>{
     passport.authenticate('local-signup',{
        successRedirect:'/done',

        failureRedirect : '/login', // redirect back to the signup page if there is an error
        
    })(req,res,next)

})


//  This Code is for uploading file using Multer -----------------------------------------------+

var {uploads}=require('./Multer/upload_file.js')

app.post('/grievance',uploads.array('documents',10), async (req,res,next)=>{
    var fs=require('fs')
    var {grievanceModel}=require('./databaseSchema')
    var email_id=req.session['passport']['user']['email']
       
    grievanceModel.collection.countDocuments({from:email_id}, (err,count) => {
        console.log(count)
        var path="./Multer/uploads/"+req.session['passport']['user']['email'].split('@')[0]+'/grievance'+String(count+1);
        console.log(path)
        fs.readdir(path,(err,files) => {
            var all_files_path=[]
        
            files.forEach(file =>{
                all_files_path.push(path+'/'+file)
            })
            
            var object={
                title:req.body.title,
                subtitle:req.body.subtitle,
                from:email_id,
                documents:all_files_path,
                status:-1,
                description:req.body.description,
                timestamp:  Date.now()

            }
            grievanceModel(object).save(()=>{console.log("Grievance added backchod");})
            
        })

        
    })

    console.log(req.session['passport']['user']['email']+" ho gaya upload bc !!")
    res.send("File Loaded successfully")

})



app.listen(process.env.PORT || 9900)

