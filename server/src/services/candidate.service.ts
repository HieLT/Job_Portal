import candidateModel from "../models/candidate.model";

class CandidateService {
    async createCandidate(candidate: any) {
        try {
            const newCandidate = new candidateModel(candidate);
            await newCandidate.save();
            return newCandidate;
        } catch (error) {
            throw error;
        }
    }

    async getCandidates() {
        try {
            const candidates = await candidateModel.find().populate('account', 'email').select(
                '_id first_name last_name phone avatar birth'
            ).exec();
            return candidates;
        } catch (error) {
            throw error;
        }
    }

    async getCandidateById(id: string) {
        try {
            const candidate = await candidateModel.findById(id).exec();
            return candidate;
        } catch (error) {
            throw error;
        }
    }

    async updateCandidate(id: string, candidate: any) {
        try {
            await candidateModel.findByIdAndUpdate(id, candidate).exec();
            return candidateModel.findById(id).exec();
        } catch (error) {
            throw error;
        }
    }

    async updateResume(id: string, resume: string) {
        try {
            await candidateModel.findByIdAndUpdate(id, {resume_path: resume}).exec();
            return candidateModel.findById(id).exec();
        }
        catch (error) {
            throw error;
        }
    } 

    async deleteResume(id: string) {
        try {
            await candidateModel.findByIdAndUpdate(id, {resume_path: ''}).exec();
            return candidateModel.findById(id).exec();
        }
        catch(error) {
            throw error;
        }
    }

    async uploadAvatar(id: string, avatar: string) {
        try {
            await candidateModel.findByIdAndUpdate(id, {
                avatar: avatar
            }).exec();
            return candidateModel.findById(id).exec();
        }
        catch (error) {
            throw error;
        }
    } 

    async deleteCandidate(id: string) {
        try {
            await candidateModel.findByIdAndDelete(id).exec();
            return {message: 'Candidate deleted successfully'};
        } catch (error) {
            throw error;
        }
    }
};

export default new CandidateService();