var  express=require('express')
var app =express()
var bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors')


var session=require('express-session')
var flash=require('connect-flash')
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


var {passportLocal}=require('./Passport/passport-config')
passportLocal(passport);


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







// These are get Routes -------------------------------------------------

var {register,login,readFile,done}=require('./Routes/getRoutes')

app.get('/register',register);
app.get('/login',login)
app.get('/readFile',readFile)
app.get('/done',done)


// These are post Routes ------------------------------------------------
var {register,logout}=require('./Routes/postRoutes')

app.post('/register',urlencodedParser,register)

app.post('/logout',logout)

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

app.listen(process.env.PORT || 9900)

