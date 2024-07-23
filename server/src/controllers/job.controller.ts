import { Request, Response } from "express";
import jobModel from "../models/job.model";
import accountModel from "../models/account.model";
import jobService from "../services/job.service";
import companyService from "../services/company.service";
import categoryModel from "../models/category.model";

class JobController {

    async createCategory(req: Request, res: Response) : Promise<void> {
        try {
            const categories = req.body;
            for (const item of categories) {
                const newCategory = new categoryModel(item);
                await newCategory.save();
            }
            res.status(201).send({message: "Create categories successfully"});
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async createJob(req: Request, res: Response) : Promise<void> {
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

    async getAllJobs(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === 'Admin') {
                    const jobs = await jobService.getAllJobs();
                    res.status(200).send(jobs);
                }
                else {
                    res.status(403).send({message: "You are not authorized to get all jobs"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
            }
        }
        catch (error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async getJobDetail(req: Request, res: Response) : Promise<void> {
        try {
            const {id} = req.query;
            const job = await jobService.getJobDetail(String(id));
            if (job) {
                res.status(200).send(job);
            }
            else {
                res.status(404).send({message: "Job not found"});
            }
        }
        catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async updateJob(req: Request, res: Response): Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({ email });
            if (account) {
                const { id_job, dataUpdate } = req.body;
                if (account.role === "Company" && account.company && await jobService.checkJob(id_job, String(account.company))) {
                    if (dataUpdate.expired_at) {
                        if (new Date(dataUpdate.expired_at).getTime() <= Date.now()) {
                            res.status(400).send({ message: "Expired date must be greater than current date" });
                        } else {
                            dataUpdate.expired_at = new Date(dataUpdate.expired_at);
                            dataUpdate.salary = String(dataUpdate.salary);
                            const updatedJob = await jobService.updateJob(id_job, dataUpdate);
                            res.status(200).send(updatedJob);
                        }
                    } else {
                        dataUpdate.salary = String(dataUpdate.salary);
                        const updatedJob = await jobService.updateJob(id_job, dataUpdate);
                        res.status(200).send(updatedJob);
                    }
                } else {
                    res.status(403).send({ message: "You are not authorized to update job" });
                }
            } else {
                res.status(404).send({ message: "Account not found" });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }

    async deleteJob(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {id_job} = req.body;
                if (account.role === "Company" && account.company && await jobService.checkJob(id_job, String(account.company))) {
                    await companyService.removeJob(String(account.company), id_job);
                    const answer = await jobService.deleteJob(id_job);
                    res.status(200).send(answer);
                }
                else {
                    res.status(403).send({message: "You are not authorized to update job"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
            }
        }
        catch (error: any) {
            res.status(500).send({message: error.message})
        }
    }
};

export default new JobController();