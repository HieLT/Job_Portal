import companyModel from "../models/company.model";

class CompanyService {
    async createCompany(company: any) {
        try {
            const newCompany = new companyModel(company);
            await newCompany.save();
            return newCompany;
        } catch (error) {
            throw error;
        }
    }

    async getAllCompanys() {
        try {
            const companys = await companyModel.find().populate('account', 'email').select(
                '_id name logo website_url founded_year createdAt'
            ).exec();
            return companys;
        } catch (error) {
            throw error;
        }
    }

    async getProfile(id: string) {
        try {
            const profile = await companyModel.findById(id).exec();
            return profile;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(id: string, company: any) {
        try {
            await companyModel.findByIdAndUpdate(id, company).exec();
            return companyModel.findById(id).exec();
        }
        catch(error) {
            throw error;
        }
    }

    async deleteCompany(id: string) {
        try {
            await companyModel.findByIdAndDelete(id).exec();
            return {message: "Company has been deleted"};
        }
        catch(error) {
            throw error;
        }
    }

    async addJob(id: string, job: string) {
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
}

export default new CompanyService();