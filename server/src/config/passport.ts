import passport from "passport";
import { Request } from "express";
import {Strategy as GoogleStrategy} from "passport-google-oauth2";
import { config } from "dotenv";
import accountModel from "../models/account.model";
config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID!,
    clientSecret: GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:8000/google/callback',
    scope: ["profile", "email"],
    passReqToCallback: true
}, async (request : Request, accessToken : any, refreshToken: any, profile: any, done: any) => {
    try {
        let account = await accountModel.findOne({email: profile.emails[0].value}).exec();
        if (!account) {
            account = new accountModel({
                email: profile.emails[0].value,
                role: request.query.role || 'Candidate',
                isGoogleAccount: true,
                socket_id: ''
            });
            await account.save();
        }
        return done(null, account);
    }
    catch(err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;