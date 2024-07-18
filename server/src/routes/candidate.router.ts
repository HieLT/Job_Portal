import express from "express";
import candidateController from "../controllers/candidate.controller";
import authentication from "../middleware/authentication";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const candidateRouter = express.Router();

candidateRouter.post('/create', [authentication], candidateController.createCandidate);
candidateRouter.get('/get-profile/:id_candidate', [authentication], candidateController.getProfile);
candidateRouter.post('/update-profile', [authentication], candidateController.updateCandidate);
candidateRouter.post('/upload-resume', [upload.single('file'), authentication], candidateController.uploadResume);
candidateRouter.post('/delete-resume', [authentication], candidateController.deleteResume);
candidateRouter.post('/upload-avatar', [authentication], candidateController.uploadAvatar);

export default candidateRouter;