import authentication from "../middleware/authentication";
import jobController from "../controllers/job.controller";
import express from "express";

const jobRouter = express.Router();

jobRouter.post('/create', [authentication], jobController.createJob);
jobRouter.get('/get-all', jobController.getAllJobs);
jobRouter.get('/search', jobController.searchJob);
jobRouter.get('/filter', jobController.filterJob);
jobRouter.get('/get-detail', jobController.getJobDetail);
jobRouter.put('/update', [authentication], jobController.updateJob);
jobRouter.put('/update-status', [authentication], jobController.updateStatusJob);
jobRouter.get('/categories', jobController.getCategoryJob);
jobRouter.get('/candidate-applied', [authentication], jobController.getCandidateApplied);

export default jobRouter;