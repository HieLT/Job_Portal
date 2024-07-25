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
};

export default new ApplicationService();