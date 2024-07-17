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
}

export default new AdminService();