import passport from "passport";
import { Request } from "express";
import {Strategy as GoogleStrategy} from "passport-google-oauth2";
import { config } from "dotenv";
import accountModel from "../models/account.model";
import candidateModel from "../models/candidate.model";
import companyModel from "../models/company.model";
import adminModel from "../models/admin.model";
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
        let profileUser = null;
        if (!account) {
            account = new accountModel({
                email: profile.emails[0].value,
                role: request.query.role || 'Candidate',
                isGoogleAccount: true,
                socket_id: ''
            });
            await account.save();
        }
        else {
            if (account && account.candidate) {
                profileUser = candidateModel.findById(account.candidate).lean();
            }
            else if (account.company) {
                profileUser = companyModel.findById(account.company).lean();
            }
            else {
                profileUser = adminModel.findById(account.admin).lean();
            }
        }
        const userSessionData = {
            account: {
                _id: account._id,
                email: account.email,
                role: account.role,
                socket_id: account.socket_id
            },
            profileUser
        };
        return done(null, userSessionData);
    }
    catch(err) {
        return done(err, null);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.account._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const account = await accountModel.findById(id).lean();
        if (!account) {
            return done(new Error('Account not found'), null);
        }

        let profileUser = null;

        if (account.candidate) {
            profileUser = await candidateModel.findById(account.candidate).lean();
        } else if (account.company) {
            profileUser = await companyModel.findById(account.company).lean();
        } else if (account.admin) {
            profileUser = await adminModel.findById(account.admin).lean();
        }

        const userSessionData = {
            account: {
                id: account._id,
                email: account.email,
                role: account.role,
                socket_id: account.socket_id
            },
            profileUser
        };

        done(null, userSessionData);
    } catch (err) {
        done(err, null);
    }
});


export default passport;