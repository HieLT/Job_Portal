import {Request, Response} from "express";
import accountModel from "../models/account.model";
import companyService from "../services/company.service";
import firebaseService from "../services/firebase.service";

class CompanyController {
    async createCompany(req: Request, res: Response) : Promise<void> {
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

    async getAllCompanys(req: Request, res: Response) : Promise<void> {
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

    async getProfile(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === "Company" && account.company) {
                    const company = await companyService.getProfile(String(account.company));
                    res.status(200).send(company);
                }
                else {
                    const {id_company} = req.query;
                    if (id_company) {
                        const company = await companyService.getProfile(String(id_company));
                        res.status(200).send(company);
                    }
                    else {
                        res.status(200).send({});
                    }
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

    async updateLogo(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Company") {
                const {logo} = req.body;
                const logoUrl = await firebaseService.uploadImage(logo);
                const profile = await companyService.getProfile(String(account.company));
                if (profile && profile.is_deleted) {
                    res.status(401).send({message: 'Company has been deleted. Please log in again'});
                    return;
                }
                const company = await companyService.updateLogo(String(account.company), logoUrl);
                res.status(200).send(company);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async updateProfile(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Company") {
                const profile = await companyService.getProfile(String(account.company));
                if (profile && profile.is_deleted) {
                    res.status(401).send({message: 'Company has been deleted. Please log in again'});
                    return;
                }
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

    async deleteCompany(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const {id_company} = req.body;
                await companyService.deleteCompany(id_company);
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

    async restoreCompany(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const {id_company} = req.body;
                await companyService.restoreCompany(id_company);
                res.status(200).send({message: 'Restore company success'});
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