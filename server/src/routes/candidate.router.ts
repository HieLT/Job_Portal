import express from "express";
import candidateController from "../controllers/candidate.controller";
import authentication from "../middleware/authentication";
import jobController from "../controllers/job.controller";
import upload from "../utils/multer";

const candidateRouter = express.Router();

candidateRouter.post('/create', [authentication], candidateController.createCandidate);
candidateRouter.get('/get-profile', [authentication], candidateController.getProfile);
candidateRouter.put('/update-profile', [authentication], candidateController.updateCandidate);
candidateRouter.put('/upload-resume', [upload.single('file'), authentication], candidateController.uploadResume);
candidateRouter.delete('/delete-resume', [authentication], candidateController.deleteResume);
candidateRouter.put('/upload-avatar', [authentication], candidateController.uploadAvatar);
candidateRouter.post('/apply-job', [upload.single('file'), authentication], jobController.candidateApply);

export default candidateRouter;