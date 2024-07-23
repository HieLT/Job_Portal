import { Request, Response } from "express";
import jobModel from "../models/job.model";
import accountModel from "../models/account.model";
import jobService from "../services/job.service";
import companyService from "../services/company.service";

class JobController {
    async createJob(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === "Company" && account.company) {
                    const job = req.body;
                    if (new Date(job.expired_at).getTime() <= Date.now()) {
                        res.status(400).send({message: "Expired date must be greater than current date"});
                    }
                    else {
                        job.expired_at = new Date(job.expired_at);
                        job.salary = String(job.salary);
                        job.company_id = account.company;
                        job.applied_candidates = [];
                        const newJob = await jobService.createJob(job);
                        await companyService.addJob(String(account.company), String(newJob._id));
                        res.status(201).send(newJob);
                    }
                }
                else {
                    res.status(403).send({message: "You are not authorized to create job"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async getJobDetail(req: Request, res: Response) {

    }
};

export default new JobController();