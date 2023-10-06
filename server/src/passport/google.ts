import passport from 'passport'
import GoogleOAuth2Strategy from 'passport-google-oauth';
import {Roles} from "../types";
import User, {UserType} from "../models/User";

const GoogleStrategy = GoogleOAuth2Strategy.OAuth2Strategy


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL + "google" as string
    },
    async function (accessToken, refreshToken, profile, done) {
        
        const { picture, email, name } = profile._json
        
        try {
            let user: UserType = await User.findOne({$or: [{googleId: profile.id}, {email: email}]})
            if (user) {
                let updatedUser = {...user}
                if (!updatedUser.roles || updatedUser.roles.length === 0)  updatedUser.roles = [Roles.CUSTOMER]
                if (!updatedUser.avatar)
                    updatedUser.avatar = picture
                if (!updatedUser.googleId)
                    updatedUser.googleId = profile.id
                if (!updatedUser.username)
                    updatedUser.username = name
                if (!updatedUser.email)
                    updatedUser.email = email
                if (!updatedUser.createdAt)
                    updatedUser.createdAt = new Date()
                
                User.findAndUpdate(
                    {email: user.email},
                    {$set: updatedUser}
                ).then((_) => {
                        delete updatedUser["password"]
                    done(null, updatedUser)
                }).catch(ex=>{
                    done(ex, null)
                })
                
                
            } else {
                // create new user
                user = {
                    username: name,
                    firstName: name,
                    lastName: "",
                    email: email,
                    avatar: picture,
                    password: "",
                    roles: [Roles.CUSTOMER],
                    createdAt: new Date()
                }
                await User.insertOne(user)
                done(null, user)
            }
            
            done(null, user)
        } catch (ex) {
            done(ex, null)
        }
        
    }
));


passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    delete obj["password"]
    cb(null, obj);
});