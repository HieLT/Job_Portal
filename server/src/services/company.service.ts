import companyModel, {ICompany} from "../models/company.model";

class CompanyService {
    async createCompany(company: Partial<ICompany>) : Promise<ICompany> {
        try {
            const newCompany = new companyModel(company);
            await newCompany.save();
            return newCompany;
        } catch (error) {
            throw error;
        }
    }

    async getAllCompanys() : Promise<ICompany[]> {
        try {
            const companys = await companyModel.find().populate('account', 'email').select(
                '_id name logo website_url founded_year createdAt'
            ).exec();
            return companys;
        } catch (error) {
            throw error;
        }
    }

    async getProfile(id: string) : Promise<ICompany | null> {
        try {
            const profile = await companyModel.findById(id).exec();
            return profile;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(id: string, company: Partial<ICompany>) : Promise<ICompany | null> {
        try {
            const updatedCompany = await companyModel.findByIdAndUpdate(id, company, {new: true}).exec();
            return updatedCompany;
        }
        catch(error) {
            throw error;
        }
    }

    async deleteCompany(id: string) : Promise<{message: string}> {
        try {
            await companyModel.findByIdAndDelete(id).exec();
            return {message: "Company has been deleted"};
        }
        catch(error) {
            throw error;
        }
    }

    async addJob(id: string, job: string) : Promise<{message: string}> {
        try {
            await companyModel.findByIdAndUpdate(id, {
                $push: {
                    jobs: job
                }
            });
            return {message: 'Add successfully'};
        }
        catch(error: any) {
            throw error;
        }
    }

    async removeJob(id: string, job: string) : Promise<{message: string}> {
        try {
            await companyModel.findByIdAndUpdate(id, {
                $pull: {
                    jobs: job
                }
            });
            return {message: 'Remove successfully'};
        }
        catch(error: any) {
            throw error;
        }
    }
}

export default new CompanyService();