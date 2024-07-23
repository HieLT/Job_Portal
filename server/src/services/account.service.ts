import accountModel, {IAccount} from "../models/account.model";

class AccountService {
    async createAccount(email: string, password: string, role: string) : Promise<IAccount> {
        try {
            const account = new accountModel({
                email,
                password,
                role,
                socket_id: ''
            });
            await account.save();
            return account;
        } catch (error) {
            throw error;
        }
    }
};

export default new AccountService();