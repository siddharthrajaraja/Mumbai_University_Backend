var  express=require('express')
var app =express()
var bodyParser=require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// These are post Routes ------------------------------------------------
var {register}=require('./Routes/postRoutes')

app.get('/register',urlencodedParser,register)





app.listen(process.env.PORT || 9900)

