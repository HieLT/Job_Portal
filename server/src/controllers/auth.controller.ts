import { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mail from "../utils/mail";
import candidateService from "../services/candidate.service";
import companyService from "../services/company.service";
import adminService from "../services/admin.service";
import accountModel from "../models/account.model";
import accountService from "../services/account.service";

class Auth {
    async register(req: Request, res: Response) : Promise<void> {
        // Register logic
        const {email, password, role} = req.body;
        try {
            const existingUser = await accountModel.findOne({email: email}).exec();
            if (existingUser) {
                res.status(400).send({message: 'Email already in use'});
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new accountModel({
                    email,
                    password: hashedPassword,
                    role,
                    verified: false,
                    socket_id: ''
                });
                await newUser.save();
                await mail.sendVerificationEmail(newUser);
    
                res.status(201).send({
                    message: 'User registered successfully. Please check your email to verify your account.'
                });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    
    async login(req: Request, res: Response) : Promise<void> {
        // Login logic
        try {
            const {email, password} = req.body;
            const user = await accountModel.findOne({email: email});
            if (user) {
                if (user.verified) {
                    const comparePass = await bcrypt.compare(password, user.password!);
                    if (comparePass) {
                        const token = await jwt.sign({email: email}, process.env.TOKEN_KEY!, {
                            expiresIn: '1h'
                        });
                        const dataUser = {
                            _id: user._id,
                            email: user.email,
                            role: user.role,
                            token,
                            verified: user.verified,
                            socket_id: user.socket_id,
                        };
                        let profile = null;
                        if (user.candidate && user.role === "Candidate") {
                            profile = await candidateService.getCandidateById(String(user.candidate));
                        }
                        else if (user.company && user.role === "Company") {
                            // get profile company
                            profile = await companyService.getProfile(String(user.company));
                        }
                        else if (user.admin && user.role === "Admin") {
                            // get profile admin
                            profile = await adminService.getProfile(String(user.admin));
                        }

                        if (profile && profile.is_deleted) {
                            res.status(403).send({message: 'Your account has been deleted'});
                            return;
                        }
                        res.status(200).send({
                            account: dataUser,
                            profile: profile
                        });
                    }
                    else {
                        res.status(400).send({message: 'Incorrect password'});
                    }
                }
                else {
                    res.status(403).send({message: 'Your email is not verified'});
                }
            }
            else {
                res.status(401).send({message: 'User not found'});
            }
        }
        catch(err: any) {
            res.status(500).send({message: err.message});
        }

        // passport.authenticate('local', (err: any, user: any, info: any) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     if (!user) {
        //         return res.status(401).send(info);
        //     }
        //     if (!user.verified) {
        //         res.status(403).send({
        //             message: 'Please verify your email first'
        //         });
        //     }
        //     req.logIn(user, (err) => {
        //         if (err) {
        //             return res.status(500).send(err);
        //         }
        //         return res.status(200).send(user);
        //     });
        // })(req, res);
    };

    async checkLoggedIn(req: Request, res: Response) : Promise<void> {
        if (req.user) {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                let profile = null;
                if (account.role === "Admin") {
                    if (account.admin) {
                        profile = await adminService.getProfile(String(account.admin));
                    }
                    else {
                        profile = {};
                    }
                }
                else if (account.role === "Candidate") {
                    if (account.candidate) {
                        profile = await candidateService.getCandidateById(String(account.candidate));
                    }
                    else {
                        profile = {};
                    }
                }
                else {
                    if (account.company) {
                        profile = await companyService.getProfile(String(account.company));
                    }
                    else {
                        profile = {};
                    }
                }
                res.status(200).send({
                    account: {
                        _id: account._id,
                        email: account.email,
                        role: account.role,
                        verified: account.verified,
                        socket_id: account.socket_id
                    },
                    profile
                });
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } else {
            res.status(403).send({ message: "Not Authorized" });
        }
    }

    async loginGoogle(req: Request, res: Response, next: NextFunction) : Promise<void> {
        // Login with Google logic
        passport.authenticate('google', {
            scope: ['email', 'profile']
        })(req, res, next);
    }

    async googleCallback(req: Request, res: Response, next: NextFunction) : Promise<void> {
        passport.authenticate('google', (err: any, user: Express.User, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/auth/failure');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('http://localhost:5174');
            });
        })(req, res, next);
    }

    async googleLoginSuccess(req: Request, res: Response) : Promise<void> {
        if (req.user) {
            res.status(200).send({
                user: req.user
            });
        } else {
            res.status(403).send({ message: "Not Authorized" });
        }
    }

    async googleFailure(req: Request, res: Response) : Promise<void> {
        res.send('Something went wrong...');
    }

    async googleLogout(req: Request, res: Response) : Promise<void> {
        req.logout((err: any) => {
            if (err) {
                console.error("Error during logout:", err);
                return res.status(500).send('Failed to log out.');
            }
            req.session.destroy((err: any) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).send('Failed to destroy session.');
                }
                res.clearCookie('connect.sid'); // Ensure the session cookie is cleared
                res.redirect('http://localhost:5174');
            });
        });
    }

    async changePassword(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (!account.isGoogleAccount) {
                    const {oldPassword, newPassword} = req.body;
                    if (oldPassword === newPassword) {
                        res.status(400).send({message: 'New password must be different from old password'});
                        return;
                    }
                    const comparePass = await bcrypt.compare(oldPassword, account.password!);
                    if (comparePass) {
                        const hashedPassword = await bcrypt.hash(newPassword, 10);
                        await accountService.changePassword(String(account._id), hashedPassword);
                        res.status(200).send({message: 'Password changed'});
                    }
                    else {
                        res.status(400).send({message: 'Incorrect password'});
                    }
                }
                else {
                    res.status(400).send({message: 'This account is created by Google'});
                }
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch (error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async requestResetPassword(req: Request, res: Response) : Promise<void>{
        try {
            const {email} = req.body;
            const account = await accountModel.findOne({email});
            if (account) {
                await mail.sendResetPassword(account);
                res.status(200).send({message: 'Please check your email. Then click the link in the inbox to reset your password'});
            }
            else {
                res.status(404).send({message: 'Account not found'});
            }
        }
        catch(error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async resetPassword(req: Request, res: Response) : Promise<void> {
        try {
            const {token, password} = req.body;
            const account = await accountModel.findOne({verificationToken: token});
            if (account) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await accountService.changePassword(String(account._id), hashedPassword);
                account.verificationToken = undefined;
                await account.save();
                res.status(200).send({message: 'Password reseted'});
            }
            else {
                res.status(400).send({message: 'Invalid token'});
            }
        }
        catch(error:any) {
            res.status(500).send({message: error.message});
        }
    }
    
    // async logout(req: Request, res: Response) {
    //     try {
    //         const email = req.user;
    //         const account = await accountModel.findOne({email});
    //         if (account) {
    //             res.status(200).send({message: 'Logout successful'});
    //         }
    //         else {
    //             res.status(401).send({message: 'Account not found'});
    //         }
    //     }
    //     catch(error: any) {
    //         res.status(500).send({message: error.message});
    //     }
    // }
}

export default new Auth();
