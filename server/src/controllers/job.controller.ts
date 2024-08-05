import { Request, Response } from "express";
import accountModel from "../models/account.model";
import jobService from "../services/job.service";
import companyService from "../services/company.service";
import applicationService from "../services/application.service";
import categoryModel from "../models/category.model";
import firebaseService from "../services/firebase.service";

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

    async getCategoryJob(req: Request, res: Response) : Promise<void> {
        try {
            const categories = await categoryModel.find().exec();
            res.status(200).send(categories);
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
            const jobs = await jobService.getAllJobs();
            res.status(200).send(jobs.slice().sort(() => Math.random() -0.5));
        }
        catch (error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async getTotalCandidateApplied(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === 'Admin') {
                    const totalCandidateApplied = await jobService.getCandidateApplied();
                    res.status(200).send({total: totalCandidateApplied});
                }
                else {
                    res.status(403).send({message: "You are not authorized to get total candidate applied"});
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

    async getJobByCompany(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === 'Company') {
                    const jobs = await jobService.getJobByCompany(String(account.company));
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

    async searchJob(req: Request, res: Response) : Promise<void> {
        try {
            const {key, type, experience_required, category} = req.query;
            const jobs = await jobService.searchJob(String(key), String(type), String(experience_required), String(category));
            res.status(200).send(jobs);
        }
        catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async getJobApplied(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === "Candidate" && account.candidate) {
                    const applications = await applicationService.getApplicationOfCandidate(String(account.candidate));
                    res.status(200).send(applications);
                }
                else {
                    res.status(403).send({message: "You are not authorized to get all jobs"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
            }
        }
        catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async candidateApply(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === 'Candidate') {
                    const {job_id, candidate_id, cover_letter, resume_path} = req.body;
                    let resume_url = '';
                    if (req.file) {
                        const resume_path = req.file;
                        resume_url = await firebaseService.uploadFile(resume_path);
                    }
                    else {
                        resume_url = resume_path;
                    }
                    const newApplication = {
                        job_id,
                        candidate_id,
                        resume_path: resume_url,
                        cover_letter
                    };
                    const application = await applicationService.createApplication(newApplication);
                    if (application) {
                        const updatedJob = await jobService.candidateApply(job_id, String(application._id));
                        if (updatedJob) {
                            res.status(200).send({message: 'Candidate apply success'});
                        }
                        else {
                            res.status(400).send({message: 'Candidate apply failed'});
                        }
                    }
                    else {
                        res.status(400).send({message: 'Candidate apply failed'});
                    }
                }
                else {
                    res.status(403).send({message: "You are not authorized to get all jobs"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
            }
        }
        catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async getCandidateApplied(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {id_job} = req.query;
                if (account.role === 'Company' && await jobService.checkJob(String(id_job), String(account.company))) {
                    const candidateApplied = await applicationService.getAppliedOfJob(String(id_job));
                    if (candidateApplied) {
                        res.status(200).send(candidateApplied);
                    }
                    else {
                        res.status(404).send({});
                    }
                }
                else {
                    res.status(403).send({message: "You are not authorized to get all jobs"});
                }
            }
            else {
                res.status(404).send({message: "Account not found"});
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

    async updateStatusJob(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({ email });
            if (account) {
                const { id_job, status} = req.body;
                if (account.role === "Company" && account.company && await jobService.checkJob(id_job, String(account.company))) {
                    const updatedJob = await jobService.updateStatusJob(id_job, status);
                    res.status(200).send(updatedJob);
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

    async restoreJob(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {id_job} = req.body;
                if (account.role === "Company" && account.company && await jobService.checkJob(id_job, String(account.company))) {
                    const answer = await jobService.restoreJob(id_job);
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