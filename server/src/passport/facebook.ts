
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
// const dbConnect = require("../database")




if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: (process.env.CALLBACK_URL || "http://localhost:4000/api/v1/auth/") + "facebook",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
      }
    ));
} else {
    console.warn("FACEBOOK_APP_ID and FACEBOOK_APP_SECRET not provided, Facebook auth disabled.");
}