import {Request, Response} from "express";
import accountModel from "../models/account.model";

const verifyEmail = () => {
    return async (req: Request, res: Response, next: Function) => {
        const email = req.body.email;
        const account = await accountModel.findOne({email});
        if (account) {
            return res.status(400).json({message: 'Email does exist'});
        }
        else {
            next();
        }
    }
};

export default verifyEmail;