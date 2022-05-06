var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dbConnect = require("../database") 





// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL+"google"
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const { c: UserCollection, client} = await dbConnect("users") 
  
    const { picture, email, name } = profile._json

    UserCollection.findOne({ 
      $or: [
        {googleId: profile.id}, 
        {email: email }
      ]
    }, async function (err, user) {
      if(!err){
        if(user){
          let updatedUser = {...user}
          if(!updatedUser.avatar)
              updatedUser.avatar = picture
          if(!updatedUser.googleId)
              updatedUser.googleId = profile.id
          if(!updatedUser.username)
              updatedUser.username = name            
          if(!updatedUser.email)
              updatedUser.email = email
          if(!updatedUser.created_at)
              updatedUser.created_at = new Date()
              
          UserCollection.updateOne(
            {email: user.email},
            {$set: {googleId: profile.id}}
          ).then(response=>{})
        // if(response.result.nModified >= 1)
        
          client.close()
          return done(err, {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: updatedUser.avatar
          });
        } else{
          // create a new user....
          let upU = await  UserCollection.insertOne({
            username: name,
            email: email,
            avatar: picture,
            password: "",
            phone: "",
            created_at: new Date()
          })
          if(upU.insertedCount){
            let u = upU.ops[0]
            client.close()
            return done(err, {
              _id: u._id,
              username: u.username,
              email: u.email,
              avatar: u.avatar
            });
          } else{
            client.close()
            return done(err, null);
          }
        }
         
      } else {
        console.log("database connect or internel error")
        client.close()
        return done(err, null);
      }
    });
  }
));


passport.serializeUser(function(user, cb) {
  console.log(user)
   cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});