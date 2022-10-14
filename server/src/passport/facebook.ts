
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
const dbConnect = require("../database") 



passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.CALLBACK_URL+"facebook"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));