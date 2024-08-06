import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import accountModel from "../models/account.model";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";
config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI;
const EMAIL_USER = process.env.EMAIL_USER;

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const createTransport = async () => {
    try {
        const ACCESS_TOKEN = await client.getAccessToken();
        if (!ACCESS_TOKEN.token) {
            throw new Error("Failed to obtain access token");
        }
        return nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN.token
            }
        } as nodemailer.TransportOptions);
    } catch (error) {
        console.error("Error creating transport:", error);
        throw error;
    }
}

class Mail {
    async sendVerificationEmail(user: any) {
        const token = uuidv4();
        const url = `http://localhost:5174/verify-email/${token}`;
        await accountModel.updateOne({ _id: user._id }, { verificationToken: token });
        const mailOptions = {
            from: 'Job Portal',
            to: user.email,
            subject: 'Account Verification',
            text: `Please click the following link to verify your email: ${url}`,
            html: `Please click the following link to verify your email: <a href="${url}">${url}</a>`,
        };
        const transporter = await createTransport();
        try {
            await transporter.sendMail(mailOptions);
            return token;
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    }

    async sendResetPassword(user: any) {
        const token = uuidv4();
        const url = `http://localhost:5174/auth/reset-password/${token}`;
        await accountModel.updateOne({ _id: user._id }, { verificationToken: token });
        const mailOptions = {
            from: 'Job Portal',
            to: user.email,
            subject: 'Reset Password',
            text: `Please click the following link to reset your password: ${url}`,
            html: `Please click the following link to reset your password: <a href="${url}">${url}</a>`,
        };
        const transporter = await createTransport();
        try {
            await transporter.sendMail(mailOptions);
            return token;
        } catch (error) {
            console.error("Error sending reset password email:", error);
            throw error;
        }
    }
}

export default new Mail();