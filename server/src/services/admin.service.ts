import adminModel, {IAdmin} from "../models/admin.model";

class AdminService {
    async getProfile(id: string) : Promise<IAdmin | null>{
        try {
            const profile = await adminModel.findById(id).exec();
            return profile;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(id: string, profile : Partial<IAdmin>) : Promise<IAdmin | null> {
        try {
            const updatedAdmin = await adminModel.findByIdAndUpdate(id, profile, {new: true}).exec();
            return updatedAdmin;
        }
        catch(error) {
            throw error;
        }
    }
}

export default new AdminService();