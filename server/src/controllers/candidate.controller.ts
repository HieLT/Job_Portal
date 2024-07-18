import {Request, Response} from "express";
import candidateService from "../services/candidate.service";
import accountModel from "../models/account.model";
import bucket from "../config/firsebase";

class CandidateController {
    async createCandidate(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            const data = req.body;
            data["account"] = account?._id;
            if (account) {
                const candidate = await candidateService.createCandidate(data);
                await accountModel.findByIdAndUpdate(account._id, {
                    candidate: candidate._id
                });
                res.status(201).send(candidate);
            }
            else {
                res.status(400).send({message: 'Account not found'});
            }
        } catch (error) {
            res.status(500).send({message: error});
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
                res.status(400).send({message: 'Account not found'});
            }
        } catch (error) {
            res.status(500).send({message: error});
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
                    console.log(id_candidate);
                    candidate = await candidateService.getCandidateById(String(id_candidate));
                }
                res.status(200).send(candidate);
            }
            else {
                res.status(400).send({message: 'Account not found'});
            }
        } catch (error) {
            res.status(500).send({message: error});
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
                    const fileName = `resumes/${req.file.originalname}`;
                    const blob = bucket.file(fileName);
                    const blobStream = blob.createWriteStream({
                        resumable: false,
                        metadata: {
                            contentType: req.file.mimetype
                        }
                    });
    
                    blobStream.on('error', (err: any) => {
                        res.status(500).send({message: err.message});
                    });
                    blobStream.on('finish', async () => {
                        await blob.makePublic();
                        const url = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                        await candidateService.updateResume(id_candidate, url);
                        res.status(200).send({message: 'File uploaded successfully', url});
                    });
                    blobStream.end(req.file.buffer);
                }
            }
            else {
                res.status(400).send({message: 'Account not found'});
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
        catch(error) {
            res.status(500).send({message: error});
        }
    }

    async uploadAvatar(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account && account.role === "Candidate") {
                const id_candidate = String(account.candidate);
                const {img} = req.body;
                const decodedImage = Buffer.from(img.uri, 'base64');
    
                const fileName = `images/${Date.now()}.${img.name}`;
                const file = bucket.file(fileName);
    
                await file.save(decodedImage, {
                    metadata: {
                        contentType: img.type,
                    },
                });
                const result = await file.getSignedUrl({
                    action: 'read',
                    expires: '12-12-2050'
                });
                await candidateService.uploadAvatar(id_candidate, String(result[0]));
                res.status(200).send({message: 'Upload avatar successfully'});
            }
            else {
                res.status(400).send({message: 'Account not found'});
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
                const {dataUpdate} = req.body;
                const id_candidate = String(account.candidate);
                const candidate = await candidateService.updateCandidate(id_candidate, dataUpdate);
                res.status(200).send(candidate);
            }
            else {
                res.status(400).send({message: 'Account not found'});
            }
        } catch (error) {
            res.status(500).send({message: error});
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
        } catch (error) {
            res.status(500).send({message: error});
        }
    }
};

export default new CandidateController();