import {Request, Response} from "express";
import candidateService from "../services/candidate.service";
import accountModel from "../models/account.model";
import firebaseService from "../services/firebase.service";

class CandidateController {
    async createCandidate(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            const data = req.body;
            data["account"] = account?._id;
            if (account && account.role === "Candidate") {
                const candidate = await candidateService.createCandidate(data);
                await accountModel.findByIdAndUpdate(account._id, {
                    candidate: candidate._id
                });
                res.status(201).send(candidate);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async getCandidates(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const candidates = await candidateService.getCandidates();
                res.status(200).send(candidates);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } catch (error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                let candidate = null;
                if (account.role === "Candidate") {
                    candidate = await candidateService.getCandidateById(String(account.candidate));
                } 
                else {
                    const {id_candidate} = req.params;
                    candidate = await candidateService.getCandidateById(String(id_candidate));
                }
                res.status(200).send(candidate);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }

    async uploadResume(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const id_candidate = String(account.candidate);
                if (!req.file) {
                    res.status(400).send({message: 'No file Uploaded'});
                }
                else {
                    const url = await firebaseService.uploadFile(req.file);
                    await candidateService.updateResume(id_candidate, url);
                    res.status(200).send({message: 'File uploaded successfully', url});
                }
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }   
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async deleteResume(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const candidate = await candidateService.deleteResume(String(account.candidate));
                res.status(200).send({message: 'File deleted successfully'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async uploadAvatar(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const id_candidate = String(account.candidate);
                const {img} = req.body;
                const url = await firebaseService.uploadImage(img);
                await candidateService.uploadAvatar(id_candidate, String(url));
                res.status(200).send({message: 'Upload avatar successfully'});
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        } 
    }

    async updateCandidate(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const dataUpdate = req.body;
                const id_candidate = String(account.candidate);
                const candidate = await candidateService.updateCandidate(id_candidate, dataUpdate);
                res.status(200).send(candidate);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } catch (error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async deleteCandidate(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Admin") {
                const {id_candidate} = req.body;
                await candidateService.deleteCandidate(id_candidate);
                res.status(200).send({message: 'Delete candidate success'});
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        } catch (error:any) {
            res.status(500).send({message: error.message});
        }
    }
};

export default new CandidateController();