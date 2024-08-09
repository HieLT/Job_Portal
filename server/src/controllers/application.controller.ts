import { Request, Response } from "express";
import applicationService from "../services/application.service";
import accountModel from "../models/account.model";
import jobService from "../services/job.service";
import companyService from "../services/company.service";

class ApplicationController {

    async updateSeen(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {id_application, id_job} = req.body;
                if (account.company && account.role === "Company" && await jobService.checkJob(id_job, String(account.company))) {
                    if (await companyService.checkCompany(String(account.company))) {
                        res.status(400).send({message: 'Company has been blocked'});
                        return;
                    }
                    const seen_at = new Date();
                    const application = await applicationService.updateSeen(String(id_application), id_job, seen_at);
                    res.status(200).send(application);
                }
                else {
                    res.status(403).send({message: "You are not authorized"});
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

    async updateDownloaded(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {id_application, id_job} = req.body;
                if (account.company && account.role === "Company" && await jobService.checkJob(id_job, String(account.company))) {
                    if (await companyService.checkCompany(String(account.company))) {
                        res.status(400).send({message: 'Company has been blocked'});
                        return;
                    }
                    const downloaded_at = new Date();
                    const application = await applicationService.updateDownloaded(String(id_application),id_job, downloaded_at);
                    res.status(200).send(application);
                }
                else {
                    res.status(403).send({message: "You are not authorized to get all jobs"});
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
}

export default new ApplicationController();