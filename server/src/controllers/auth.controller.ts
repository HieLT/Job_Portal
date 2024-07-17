import { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/mailValidation";
import candidateService from "../services/candidate.service";
import accountModel from "../models/account.model";

class Auth {
    async register(req: Request, res: Response) {
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
                await sendVerificationEmail(newUser);
    
                res.status(201).send({
                    message: 'User registered successfully. Please check your email to verify your account.'
                });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    
    async login(req: Request, res: Response) {
        // Login logic
        try {
            const {email, password} = req.body;
            const user = await accountModel.findOne({email: email});
            if (user) {
                if (user.verified) {
                    const comparePass = await bcrypt.compare(password, user.password!);
                    if (comparePass) {
                        const dataUser = {
                            email: user.email,
                            role: user.role,
                            verified: user.verified,
                            socket_id: user.socket_id,
                        };
                        let profile = null;
                        if (user.candidate) {
                            profile = await candidateService.getCandidateById(String(user.candidate));
                        }
                        else if (user.company) {
                            // get profile company
                        }
                        else {
                            // get profile admin
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

    async loginGoogle(req: Request, res: Response, next: NextFunction) {
        // Login with Google logic
        passport.authenticate('google', {
            scope: ['email', 'profile']
        })(req, res, next);
    }

    async googleCallback(req: Request, res: Response, next: NextFunction) {
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
                return res.redirect('http://localhost:3000');
            });
        })(req, res, next);
    }

    async googleLoginSuccess(req: Request, res: Response) {
        if (req.user) {
            res.status(200).send({
                user: req.user
            });
        } else {
            res.status(403).send({ message: "Not Authorized" });
        }
    }

    async googleFailure(req: Request, res: Response) {
        res.send('Something went wrong...');
    }

    async googleLogout(req: Request, res: Response) {
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
                res.redirect('http://localhost:3000');
            });
        });
    }
    
}

export default new Auth();
