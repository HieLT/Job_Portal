import {Request, Response} from "express";
import candidateService from "../services/candidate.service";
import accountModel from "../models/account.model";
import firebaseService from "../services/firebase.service";
import candidateModel from "../models/candidate.model";
import fileModel , { IFile } from "../models/file.model";
import fileService from "../services/file.service";

class CandidateController {
    async createCandidate(req: Request, res: Response) : Promise<void> {
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

    async getCandidates(req: Request, res: Response) : Promise<void> {
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

    async getProfile(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                let candidate = null;
                if (account.role === "Candidate" && account.candidate) {
                    candidate = await candidateService.getCandidateById(String(account.candidate));
                } 
                else {
                    const {id_candidate} = req.query;
                    if (id_candidate) {
                        candidate = await candidateService.getCandidateById(String(id_candidate));
                    }
                    else {
                        candidate = {};
                    }
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

    async getAllResume(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                if (account.role === "Candidate" && account.candidate) {
                    const resumes = await candidateService.getAllResume(String(account.candidate));
                    res.status(200).send(resumes);
                }
                else {
                    res.status(401).send({message: 'Account not found'});
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

    async uploadResume(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const id_candidate = String(account.candidate);
                const {name_resume} = req.body;
                if (!req.file) {
                    res.status(400).send({message: 'No file Uploaded'});
                }
                else {
                    const candidate = await candidateModel.findById(id_candidate).populate({
                        path: 'resume_path',
                        model: 'File'
                    });
                    if (candidate && candidate.resume_path.length > 0) {
                        for (const file_resume of candidate.resume_path) {
                            if ((file_resume as unknown as IFile).file_name === name_resume) {
                                res.status(400).send({ message: 'File name already exists' });
                                return;
                            }
                        }
                    }
                    const url = await firebaseService.uploadFile({
                        originalname: name_resume,
                        buffer: req.file.buffer,
                        mimetype: req.file.mimetype
                    });
                    const file = new fileModel({
                        file_name: name_resume,
                        file_url: url,
                        type: req.file.mimetype
                    });
                    const id_file = (await fileService.createFile(file))._id;
                    await candidateService.updateResume(id_candidate, String(id_file));
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

    async deleteResume(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const {id_resume} = req.body;
                const candidate = await candidateModel.findById(account.candidate);
                const resumes = candidate?.resume_path;
                if (!resumes?.includes(id_resume)) {
                    res.status(400).send({message: 'This resume is not off you'});
                    return;
                }
                const candidateUpdated = await candidateService.deleteResume(String(account.candidate), id_resume);
                if (candidateUpdated) {
                    res.status(200).send({message: 'File deleted successfully'});
                }
                else {
                    res.status(400).send({message: 'Delete failed'});
                }
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }

    async uploadAvatar(req: Request, res: Response) : Promise<void> {
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

    async updateCandidate(req: Request, res: Response) : Promise<void> {
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

    async deleteCandidate(req: Request, res: Response) : Promise<void> {
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