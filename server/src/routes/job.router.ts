import authentication from "../middleware/authentication";
import jobController from "../controllers/job.controller";
import express from "express";

const jobRouter = express.Router();

jobRouter.post('/create', [authentication], jobController.createJob);
jobRouter.get('/get-all', [authentication], jobController.getAllJobs);
jobRouter.get('/get-detail', [authentication], jobController.getJobDetail);
jobRouter.put('/update', [authentication], jobController.updateJob);
jobRouter.put('/update-status', [authentication], jobController.updateStatusJob);
jobRouter.get('/categories', jobController.getCategoryJob);
jobRouter.get('/candidate-applied', [authentication], jobController.getCandidateApplied);

export default jobRouter;