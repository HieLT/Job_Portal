import jobModel from "../models/job.model";
import { IJob } from "../models/job.model";

class JobService {
    async createJob(job: Partial<IJob>) : Promise<IJob> {
        try {
            const newJob = new jobModel(job);
            await newJob.save();
            return newJob;
        }
        catch (error) {
            throw error;
        }
    }

    async getAllJobs() : Promise<IJob[]> {
        try {
            const jobs = await jobModel.find().exec();
            return jobs;
        }
        catch (error) {
            throw error;
        }
    }

    async getCandidateApplied() : Promise<number> {
        try {
            const applied = await jobModel.find().exec();
            let total = 0;
            for (const item of applied) {
                total += item.applied_candidates.length;
            }
            return total;
        }
        catch(error) {
            throw error;
        }
    }

    async getJobDetail(id: string) : Promise<IJob | null> {
        try {
            const job = await jobModel.findById(id).populate(
                'company_id category_id'
            ).exec();
            return job;
        }
        catch(error) {
            throw error;
        }
    }

    async getJobByCompany(id: string) : Promise<IJob[]> {
        try {
            const jobs = await jobModel.find({company_id: id}).populate('category_id').exec();
            return jobs;
        }
        catch(error) {
            throw error;
        }
    }

    async checkJob(id: string, company: string) : Promise<boolean> {
        try {
            const job = await jobModel.findById(id).exec();
            if (job && String(job.company_id) === company) {
                return true;
            } 
            else {
                return false;
            }
        }
        catch(error) {
            throw error;
        }
    }

    async updateJob(id: string, job: Partial<IJob>) : Promise<IJob | null> {
        try {   
            const updatedJob = await jobModel.findByIdAndUpdate(id, job, {new: true}).exec();
            return updatedJob;
        }
        catch(error) {
            throw error;
        }
    }

    async updateStatusJob(id: string, status: string) : Promise<IJob | null> {
        try {
            const updatedJob = await jobModel.findByIdAndUpdate(id, {
                status: status
            }, {new: true}).exec();
            return updatedJob;
        }
        catch(error) {
            throw error;
        }
    }

    async deleteJob(id: string) : Promise<{message: string}> {
        try {   
            await jobModel.findByIdAndUpdate(id, {
                is_deleted: true
            });
            return {message: 'Job deleted'};
        }
        catch(error) {
            throw error;
        }
    }

    async candidateApply(id: string, application: string) : Promise<IJob | null> {
        try {   
            const updatedJob = await jobModel.findByIdAndUpdate(id, {
                $push: {
                    applied_candidates: application
                }
            }, {new: true});
            return updatedJob;
        }
        catch(error) {
            throw error;
        }
    }
}

export default new JobService();