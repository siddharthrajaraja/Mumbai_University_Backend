var  express=require('express')
var app =express()
var bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// These are post Routes ------------------------------------------------
var {register,login}=require('./Routes/postRoutes')

app.post('/register',urlencodedParser,register)

app.post('/login',urlencodedParser,login)




app.listen(process.env.PORT || 9900)

