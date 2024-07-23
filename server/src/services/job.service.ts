import jobModel from "../models/job.model";
import { IJob } from "../models/job.model";

class JobService {
    async createJob(job: any) : Promise<IJob> {
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

    async updateJob(id: string, job: any) {
        try {   
            await jobModel.findByIdAndUpdate(id, job);
            return jobModel.findById(id);
        }
        catch(error) {
            throw error;
        }
    }

    async deleteJob(id: string) {
        try {   
            await jobModel.findByIdAndDelete(id);
            return {message: 'Job deleted'};
        }
        catch(error) {
            throw error;
        }
    }
}

export default new JobService();