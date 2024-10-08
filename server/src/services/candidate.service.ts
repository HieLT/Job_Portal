import { ObjectId } from "mongodb";
import candidateModel, {ICandidate} from "../models/candidate.model";
import { IFile } from "../models/file.model";

class CandidateService {
    async createCandidate(candidate: Partial<ICandidate>) : Promise<ICandidate> {
        try {
            const newCandidate = new candidateModel(candidate);
            await newCandidate.save();
            return newCandidate;
        } catch (error) {
            throw error;
        }
    }

    async getCandidates() : Promise<ICandidate[]> {
        try {
            const candidates = await candidateModel.find().populate('account', 'email').select(
                '_id first_name last_name phone avatar gender birth is_deleted'
            ).exec();
            return candidates;
        } catch (error) {
            throw error;
        }
    }

    async getCandidateById(id: string) : Promise<ICandidate | null> {
        try {
            const candidate = await candidateModel.findById(id).exec();
            return candidate;
        } catch (error) {
            throw error;
        }
    }

    async updateCandidate(id: string, candidate: Partial<ICandidate>) : Promise<ICandidate | null> {
        try {
            const updatedCandidate = candidateModel.findByIdAndUpdate(id, candidate, {new: true}).exec();
            return updatedCandidate;
        } catch (error) {
            throw error;
        }
    }

    async getAllResume(id: string) {
        try {
            const candidate = await candidateModel.findById(id).populate('resume_path').exec();
            return candidate?.resume_path || [];
        } catch (error) {
            throw error;
        }
    }

    async updateResume(id: string, resume: string) : Promise<ICandidate | null> {
        try {
            const updatedCandidate = await candidateModel.findByIdAndUpdate(id, {
                $push: {
                    resume_path: resume
                }
            }, {new: true}).exec();
            return updatedCandidate;
        }
        catch (error) {
            throw error;
        }
    } 

    async deleteResume(id: string, resume: string) : Promise<ICandidate | null> {
        try {
            const updatedCandidate = await candidateModel.findByIdAndUpdate(id, {
                $pull: {
                    resume_path: resume
                }
            }, {new: true}).exec();
            return updatedCandidate;
        }
        catch(error) {
            throw error;
        }
    }

    async uploadAvatar(id: string, avatar: string) : Promise<ICandidate | null> {
        try {
            const updatedCandidate = await candidateModel.findByIdAndUpdate(id, {
                avatar: avatar
            }, {new: true}).exec();
            return updatedCandidate;
        }
        catch (error) {
            throw error;
        }
    } 

    async deleteCandidate(id: string) : Promise<{message: string}> {
        try {
            await candidateModel.findByIdAndUpdate(id, {
                is_deleted: true
            }).exec();
            return {message: 'Candidate deleted successfully'};
        } catch (error) {
            throw error;
        }
    }

    async restoreCandidate(id: string) : Promise<{message: string}> {
        try {
            await candidateModel.findByIdAndUpdate(id, {
                is_deleted: false
            }).exec();
            return {message: 'Candidate deleted successfully'};
        } catch (error) {
            throw error;
        }
    }
};

export default new CandidateService();