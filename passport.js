const passport=require('passport')
const User=require('./models/User')
const config=require('./config/config')

const LocalStrategy=require('passport-local').Strategy
const JWTStrategy=require('passport-jwt').Strategy
const {ExtractJwt}=require('passport-jwt')

passport.use(new JWTStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.authentication.jwtSecret
},async (payload,done)=>{
    try{
          //find the user specified in token
        const user= await User.findByPk(payload.sub)
        //if user does not exist handle it
        if (!user){
            
            return done (null,false)
            
        }
        //otherwise return the user 
        done (null,user)
        }   
    catch(error){
        console.log(error)
        done(error,false)
    }
}));


//local strategy

passport.use(new LocalStrategy({
    usernameField:'username'
},async (username,password,done)=>{
   
    try{
    //find the user with username
    const user=await User.findOne({
        where:{
            username:username
        }
    })
    //if not handle it
    if (!user){
        return done (null,false)
    }
    //check if passwords match
    const isMatch=await user.comparePassword(password)

    //if not handle 
    if(!isMatch){

        return done(null,false)
    }
    //otherwise return user
    done(null,user)
}
catch(err){
    console.log(err)
    done(err,false)
}
}))












// passport.use(new LocalStrategy({
//     usernameField:username,
//     passwordField:password
// },
// async (username, password, done)=> {
//     //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
//     try{
//         const user = await User.findOne({username: username});
//         const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
//     if (passwordsMatch){
//         return done(null, user);
//     }
//     else{
//         return done('Incorrect Username / Password');
//     }
// }
//     catch(err){
//         console.log(error)
//     }
//     }))

//     passport.use(new JWTStrategy({
//         jwtFromRequest: req => req.cookies.jwt,
//         secretOrKey: config.authentication.jwtSecret,
//       },
//       (jwtPayload, done) => {
//         if (Date.now() > jwtPayload.expires) {
//           return done('jwt expired');
//         }
    
//         return done(null, jwtPayload);
//       }
//     ));

// passport.use(
//     new JwtStrategy({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey:config.authentication.jwtSecret
//     }
//     ,async function(jwtPayload,done){
//         try{
//             console.log('letting user in')
//             const user=await User.findByPk({
//                     id:jwtPayload.id   
//             })
//             console.log(user)
//             if(!user)
//             {
//                 return done(new Error(),false)
//             }

//             return (null,user)
//         }
//         catch(err)
//         {
//             return done(new Error(),false)
//         }
    
//     })
// )

// function isAuthenticated(req,res,next){
//     passport.authenticate('jwt',function(err,user){
//         if(err||!user){
//             res.status(403).send({
//                 err:'You do not have access'
//             })
//         }
//         else{
//             console.log('is authenticated')
//             console.log(req.user)
//             req.user=user
//             next()
//         }
//     })(req,res,next)
// }

// module.exports=isAuthenticated