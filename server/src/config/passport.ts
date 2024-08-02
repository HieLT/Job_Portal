import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import accountModel from "../models/account.model";
import candidateModel from "../models/candidate.model";
import companyModel from "../models/company.model";
import adminModel from "../models/admin.model";
config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, TOKEN_KEY } = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID!,
    clientSecret: GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:8000/google/callback',
    scope: ["profile", "email"],
    passReqToCallback: true
}, async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        const email = profile.emails[0].value;
        let account = await accountModel.findOne({ email }).exec();
        let profileUser = null;

        if (!account) {
            account = new accountModel({
                email,
                role: req.query.role || 'Candidate',
                isGoogleAccount: true,
                socket_id: '',
            });
            await account.save();
        } else {
            profileUser = await findProfileUser(account);
        }

        if (profileUser === null) {
            profileUser = profile;
        }

        if ((account.role === "Candidate" || account.role === "Company") && profileUser.is_deleted) {
            return done(null, false, { message: 'Your account is not accessible.' });
        }

        const token = generateToken({ email: account.email });

        const userSessionData = {
            account: {
                _id: account._id,
                email: account.email,
                role: account.role,
                token: token,
                socket_id: account.socket_id,
            },
            profileUser
        };

        return done(null, userSessionData);
    } catch (err) {
        console.error("Error during authentication:", err);
        return done(err, null);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.account._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const account = await accountModel.findById(id).lean();
        if (!account) return done(new Error('Account not found'), null);

        const profileUser = await findProfileUser(account);
        if ((account.role === "Candidate" || account.role === "Company") && profileUser && profileUser.is_deleted) {
            return done(null, { message: 'Your account is not accessible.' });
        }

        const token = generateToken({ email: account.email });

        const userSessionData = {
            account: {
                _id: account._id,
                email: account.email,
                role: account.role,
                token: token,
                socket_id: account.socket_id,
            },
            profileUser
        };

        done(null, userSessionData);
    } catch (err) {
        console.error("Error during deserialization:", err);
        done(err, null);
    }
});

// Helper function to find profile user
async function findProfileUser(account: any) {
    try {
        if (account.candidate) {
            return await candidateModel.findById(account.candidate).lean();
        } else if (account.company) {
            return await companyModel.findById(account.company).lean();
        } else if (account.admin) {
            return await adminModel.findById(account.admin).lean();
        }
        return null;
    } catch (err) {
        console.error("Error finding profile user:", err);
        return null;
    }
}

// Helper function to generate JWT
function generateToken(payload: any) {
    try {
        return jwt.sign(payload, TOKEN_KEY!, { expiresIn: '1h' });
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Token generation failed");
    }
}

export default passport;
