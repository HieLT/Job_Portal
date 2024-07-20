import express from "express";
import authentication from "../middleware/authentication";
import adminController from "../controllers/admin.controller";
import candidateController from "../controllers/candidate.controller";
import companyController from "../controllers/company.controller";

const adminRouter = express.Router();

adminRouter.get('/get-candidate', [authentication], candidateController.getCandidates);
adminRouter.get('/get-company', [authentication], companyController.getAllCompanys);
adminRouter.post('/delete-candidate', [authentication], candidateController.deleteCandidate);
adminRouter.post('/delete-company', [authentication], companyController.deleteCompany);
adminRouter.get('/get-profile', [authentication], adminController.getProfile);
adminRouter.post('/update-profile', [authentication], adminController.updateProfile);

export default adminRouter;