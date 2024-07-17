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

    async getProfile(id: string) {
        try {
            const profile = await companyModel.findById(id).exec();
            return profile;
        } catch (error) {
            throw error;
        }
    }
}

export default new CompanyService();