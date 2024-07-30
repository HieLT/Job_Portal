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

    async getApplicationOfCandidate(id_candidate: string) : Promise<IApplication[]> {
        try {
            const applications = await applicationModel.find({candidate: id_candidate}).exec();
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