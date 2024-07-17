import express from "express";
import candidateController from "../controllers/candidate.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

const candidateRouter = express.Router();

candidateRouter.get('/get-profile', candidateController.getCandidateById);
candidateRouter.post('/update-profile', candidateController.createCandidate);
candidateRouter.post('/upload-resume', upload.single('file'), candidateController.uploadResume);
candidateRouter.post('/delete-resume', candidateController.deleteCandidate);

export default candidateRouter;