import express from "express";
import candidateController from "../controllers/candidate.controller";
import authentication from "../middleware/authentication";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const candidateRouter = express.Router();

candidateRouter.post('/create', [authentication], candidateController.createCandidate);
candidateRouter.get('/get-profile', [authentication], candidateController.getProfile);
candidateRouter.put('/update-profile', [authentication], candidateController.updateCandidate);
candidateRouter.put('/upload-resume', [upload.single('file'), authentication], candidateController.uploadResume);
candidateRouter.delete('/delete-resume', [authentication], candidateController.deleteResume);
candidateRouter.put('/upload-avatar', [authentication], candidateController.uploadAvatar);

export default candidateRouter;