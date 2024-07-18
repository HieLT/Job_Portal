import adminModel from "../models/admin.model";

class AdminService {
    async getProfile(id: string) {
        try {
            const profile = await adminModel.findById(id).exec();
            return profile;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(id: string, profile : any) {
        try {
            await adminModel.findByIdAndUpdate(id, profile).exec();
            return adminModel.findById(id).exec();
        }
        catch(error) {
            throw error;
        }
    }
}

export default new AdminService();