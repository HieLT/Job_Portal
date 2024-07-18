import {Request, Response} from "express";
import accountModel from "../models/account.model";
import companyService from "../services/company.service";
import firebaseService from "../services/firebase.service";
import companyModel from "../models/company.model";

class CompanyController {
    async createCompany(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email: email});
            if (account && account.role === "Company") {
                const data = req.body;
                const logo = data.logo;
                const logoUrl = await firebaseService.uploadImage(logo);
                data.logo = logoUrl;
                data.account = account._id;
                const company = await companyService.createCompany(data);
                await accountModel.findByIdAndUpdate(account._id, {
                    company: company._id
                });
                res.status(201).send(company);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async getAllCompanys(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email: email});
            if (account && account.role === "Admin") {
                const companys = await companyService.getAllCompanys();
                res.status(200).send(companys);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === "Company") {
                    const company = await companyService.getProfile(String(account.company));
                    res.status(200).send(company);
                }
                else {
                    const {id_company} = req.query;
                    const company = await companyService.getProfile(String(id_company));
                    res.status(200).send(company);
                }
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Company") {
                const company = await companyService.updateProfile(String(account.company), req.body);
                res.status(200).send(company);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async deleteCompany(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Company") {
                await companyService.deleteCompany(String(account.company));
                res.status(200).send({message: 'Delete company success'});
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }
}

export default new CompanyController();