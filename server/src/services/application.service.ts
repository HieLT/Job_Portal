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
};

export default new ApplicationService();