import {Request, Response} from "express";
import accountModel from "../models/account.model";
import adminService from "../services/admin.service";

class AdminController {
    async getProfile(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const profile = await adminService.getProfile(String(account.admin));
                res.status(200).send(profile);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error});
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const profile = await adminService.updateProfile(String(account.admin), req.body);
                res.status(200).send(profile);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error});
        }
    }
};

export default new AdminController();
