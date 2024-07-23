import express from "express";
import companyController from "../controllers/company.controller";
import jobController from "../controllers/job.controller";
import authentication  from "../middleware/authentication";

const companyRouter = express.Router();

companyRouter.post('/create', [authentication], companyController.createCompany);
companyRouter.get('/get-profile', [authentication], companyController.getProfile);
companyRouter.put('/update-profile', [authentication], companyController.updateProfile);
companyRouter.delete('/delete-job', [authentication], jobController.deleteJob);

export default companyRouter;