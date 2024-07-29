import nodemailer from "nodemailer";
import {v4 as uuidv4} from "uuid";
import accountModel from "../models/account.model";
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDICT_URI = process.env.REDICT_URI;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDICT_URI);
client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const accessToken = async () => {
    const token = (await client.getAccessToken()).token;
    return token;
} 
    

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    }
})

const sendVerificationEmail = async (user: any) => {
    const token = uuidv4();
    const url = `http://localhost:5174/verify-email/${token}`;
    await accountModel.updateOne({_id: user._id}, {verificationToken: token});
    const mailOptions = {
        from: 'Job Portal',
        to: user.email,
        subject: 'Account Verification',
        text: `Please click the following link to verify your email: ${url}`,
        html: `Please click the following link to verify your email: <a href="${url}">${url}</a>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        return token;
    } catch (error) {
        throw error;
    }
};

export default sendVerificationEmail;