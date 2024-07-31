import applicationModel, {IApplication} from "../models/application.model";

class ApplicationService {
    async createApplication(application: Partial<IApplication>) : Promise<IApplication> {
        try {
            const newApplication = new applicationModel(application);
            await newApplication.save();
            return newApplication;
        }
        catch(error) {
            throw error;
        }
    }

    async getAppliedOfJob(id_job: string) : Promise<IApplication[]> {
        try {
            const appliedOfJob = await applicationModel.find({job_id: id_job}).populate(
                'candidate_id'
            ).exec();
            return appliedOfJob;
        }
        catch (error) {
            throw error;
        }
    }

    async getApplicationOfCandidate(id_candidate: string): Promise<IApplication[]> {
        try {
            const applications = await applicationModel.find({ candidate_id: id_candidate })
                .populate({
                    path: 'job_id',
                    select: '_id title description type salary number_of_recruitment position status expired_at experience_required company_id',
                    populate: {
                        path: 'company_id',
                        select: '_id name logo', // Select fields from the company schema as needed
                    }
                })
                .select('job_id resume_path cover_letter')
                .exec();
            return applications;
        }
        catch (error) {
            throw error;
        }
    }
    

    async updateSeen(id: string, job_id: string, seen_at: Date) : Promise<IApplication | null> {
        try {
            const application = await applicationModel.findOne({_id: id, job_id: job_id}).exec();
            if (application?.seen_at) {
                return application;
            }
            else {
                const updatedApplication = await applicationModel.findByIdAndUpdate(id, {
                    seen_at: seen_at
                }, {new: true}).exec();
                return updatedApplication;
            }
        }
        catch(error) {
            throw error;
        }
    }

    async updateDownloaded(id: string, job_id: string, downloaded_at: Date) : Promise<IApplication | null> {
        try {
            const application = await applicationModel.findOne({_id: id, job_id: job_id}).exec();
            if (application?.downloaded_at) {
                return application;
            }
            else {
                const updatedApplication = await applicationModel.findByIdAndUpdate(id, {
                    downloaded_at: downloaded_at
                }, {new: true}).exec();
                return updatedApplication;
            }
        }
        catch(error) {
            throw error;
        }
    }
};

export default new ApplicationService();