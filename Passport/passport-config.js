// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var {studentModel,committeeModel,secretaryModel}= require('../databaseSchema');

// expose this function to our app using module.exports
module.exports.passportLocal = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("yes",user)
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null,id)
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log(req.body,"mein yaha hu")
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        
        // Secretary Checking : 

        /*studentModel.findOne({ 'email' :  req.body.email }, function(err, user) {
            console.log(user)
            // if there are any errors, return the error
            if (err)
                return done(err);
            else if (user.length==0) return done(null,false)
            return done(null,user);
            
        });    */

        var bcrypt=require('bcrypt')

        
        
        secretaryModel.findOne({ 'email' :  req.body.email }, function(err, user) {
            console.log(user)
            // if there are any errors, return the error
            if (err)
                return done(err);
            else if (user !=null)
                {
                    bcrypt.compare(req.body.password,user.password).then(result=>{
                        console.log("secretary logged in,",result,user.password,req.body.password)
                        if(result==true) return done(null,user);
                        else return done(null,false)
                    })
                    
                } 
            
        });

        committeeModel.findOne({ 'email' :  req.body.email }, function(err, user) {
            console.log(user)
            // if there are any errors, return the error
            if (err)
                return done(err);
            else if (user!=null){
                bcrypt.compare(req.body.password,user.password).then(result=>{
                    console.log("committe logged in,",result,user.password,req.body.password)
                    if(result==true) return done(null,user);
                    else return done(null,false)
                })
            

            }
        });   
        
        
        studentModel.findOne({ 'email' :  req.body.email }, function(err, user) {
            console.log(user)
            // if there are any errors, return the error
            if (err)
                return done(err);
            else if (user !=null){

                bcrypt.compare(req.body.password,user.password).then(result=>{
                    console.log("student logged in",result,user.password,req.body.password)
                    if(result==true) return done(null,user);
                    else return done(null,false)
                })
            
            } 
        });

        

        
        });

    }));

};

