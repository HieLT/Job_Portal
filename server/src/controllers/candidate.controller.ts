import {Request, Response} from "express";
import candidateService from "../services/candidate.service";
import accountModel from "../models/account.model";
import fileModel from "../models/file.model";

class CandidateController {
    async createCandidate(req: Request, res: Response) {
        try {
            const candidate = await candidateService.createCandidate(req.body);
            await accountModel.findByIdAndUpdate(req.body.account, {
                candidate: candidate._id
            });
            res.status(201).send(candidate);
        } catch (error) {
            res.status(500).send({message: error});
        }
    }

    async getCandidates(req: Request, res: Response) {
        try {
            const candidates = await candidateService.getCandidates();
            res.status(200).send(candidates);
        } catch (error) {
            res.status(500).send({message: error});
        }
    }

    async getCandidateById(req: Request, res: Response) {
        try {
            const candidate = await candidateService.getCandidateById(req.params.id);
            res.status(200).send(candidate);
        } catch (error) {
            res.status(500).send({message: error});
        }
    }

    async uploadResume(req: Request, res: Response) {
        try {
            const {id_candidate} = req.body;
            if (!req.file) {
                res.status(400).send({message: 'No file Uploaded'});
            }
            else {
                const newFile = new fileModel({
                    file_name: req.file?.originalname,
                    data: req.file?.buffer,
                    content_type: req.file?.mimetype
                });

                await newFile.save();
                const candidate = await candidateService.updateResume(id_candidate, String(newFile._id));
                res.status(200).send({message: 'File uploaded successfully'});
            }
        }   
        catch(error) {
            res.status(500).send({message: error});
        }
    }

    async deleteResume(req: Request, res: Response) {
        try {
            const {id_candidate} = req.body;
            const candidate = await candidateService.deleteResume(id_candidate);
            res.status(200).send({message: 'File deleted successfully'});
        }
        catch(error) {
            res.status(500).send({message: error});
        }
    }

    async updateCandidate(req: Request, res: Response) {
        try {
            const {id_candidate, dataUpdate} = req.body;
            const candidate = await candidateService.updateCandidate(id_candidate, dataUpdate);
            res.status(200).send(candidate);
        } catch (error) {
            res.status(500).send({message: error});
        }
    }

    async deleteCandidate(req: Request, res: Response) {
        try {
            await candidateService.deleteCandidate(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send({message: error});
        }
    }
};

export default new CandidateController();