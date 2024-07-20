import express, { Request, Response } from "express";
import accountModel from "../models/account.model";

const emailVerificationRouter = express.Router();

emailVerificationRouter.get('/verify/:token', async (req: Request, res: Response) => {
    try {
        const {token} = req.params;
        const user = await accountModel.findOne({verificationToken: token}).exec();
    
        if (!user) {
            return res.status(400).send({message: 'Invalid token'});
        }
    
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).send({
            message: 'Email verified successfully'
        });
    }
    catch(err) {
        res.status(500).send({message: err});
    }
});

export default emailVerificationRouter;