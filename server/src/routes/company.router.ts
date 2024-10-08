import express from "express";
import companyController from "../controllers/company.controller";
import jobController from "../controllers/job.controller";
import authentication  from "../middleware/authentication";
import chatController from "../controllers/chat.controller";

const companyRouter = express.Router();

companyRouter.post('/create', [authentication], companyController.createCompany);
companyRouter.get('/get-profile', [authentication], companyController.getProfile);
companyRouter.get('/get-history-chat', [authentication], chatController.getHistoryChatOfCompany);
companyRouter.put('/update-profile', [authentication], companyController.updateProfile);
companyRouter.put('/update-logo', [authentication], companyController.updateLogo);
companyRouter.get('/get-jobs', [authentication], jobController.getJobByCompany);
companyRouter.delete('/delete-job', [authentication], jobController.deleteJob);
companyRouter.post('/restore-job', [authentication], jobController.restoreJob);

export default companyRouter;