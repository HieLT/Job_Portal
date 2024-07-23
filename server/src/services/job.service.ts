import jobModel from "../models/job.model";

class JobService {
    async createJob(job: any) {
        try {
            const newJob = new jobModel(job);
            await newJob.save();
            return newJob;
        }
        catch (error) {
            throw error;
        }
    }
}

export default new JobService();