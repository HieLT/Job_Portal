import categoryModel from "../models/category.model";
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

    async getAllJobs(page: number) : Promise<{}> {
        try {
            const numberPage = page || 1;
            const size = 10;
            const skip = (numberPage - 1) * size;
            const totalJobs = await jobModel.countDocuments();
            const jobs = await jobModel.find().skip(skip).limit(size).exec();
            jobs.sort(function(a: any, b:any){
                return b.createdAt.getTime() - a.createdAt.getTime();
            });
            return {
                jobs: jobs,
                totalJobs,
                totalPages: Math.ceil(totalJobs / size),
                page: numberPage,
                size: 10
            };
        }
        catch (error) {
            throw error;
        }
    }

    async getAllJobsOpen(page: number) : Promise<{}> {
        try {
            const numberPage = page || 1;
            const size = 10;
            const skip = (numberPage - 1) * size;
            const jobs = await jobModel.find({is_deleted: false, status: 'Open'})
            .skip(skip).limit(size).exec();
            const totalJobs = jobs.length;
            jobs.sort(function(a: any, b:any){
                return b.createdAt.getTime() - a.createdAt.getTime();
            });
            return {
                jobs: jobs,
                totalJobs,
                totalPages: Math.ceil(totalJobs / size),
                page: numberPage,
                size: 10
            };
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

    async  searchJob(
        key: string | null,
        type: string | null,
        experience_required: string | null,
        category: string | null,
        page: number
    ): Promise<{}> {
        try {
            const searchCriteria: any = {is_deleted: false, status: 'Open'};
            if (key) {
                searchCriteria.$or = [
                    { title: { $regex: key, $options: 'i' } },
                    { description: { $regex: key, $options: 'i' } }
                ];
            }
            if (type) {
                searchCriteria.type = type;
            }
            if (experience_required) {
                if (experience_required === 'LESS THAN 1 YEAR') {
                    searchCriteria.experience_required = [
                        'NOT REQUIRED',
                        'LESS THAN 1 YEAR'
                    ];
                }
                else {
                    searchCriteria.experience_required = experience_required;
                }
            }
            if (category) {
                const categoryDocument = await categoryModel.findOne({ name: category });
                if (categoryDocument) {
                    searchCriteria.category_id = categoryDocument._id;
                } else {
                    return [];
                }
            }

            const numberPage = page ? page : 1;
            const size = 10;
            const skip = (numberPage - 1) * 10;
            const jobs = await jobModel.find(searchCriteria)
            .populate('company_id category_id').select('_id title description type salary position status expired_at experience_required company_id category_id is_deleted createdAt number_of_recruitment')
            .skip(skip).limit(size)
            .exec();
            jobs.sort(function(a: any, b:any){
                return b.createdAt.getTime() - a.createdAt.getTime();
            });
            return {
                totalJobs: jobs.length,
                jobs: jobs,
                page: numberPage,
                totalPages: Math.ceil(jobs.length / size),
                size
            };
        } catch (error) {
            throw new Error("Failed to fetch jobs");
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

    async restoreJob(id: string) : Promise<{message: string}> {
        try {   
            await jobModel.findByIdAndUpdate(id, {
                is_deleted: false
            });
            return {message: 'Job restored'};
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