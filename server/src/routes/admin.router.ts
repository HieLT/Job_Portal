import express from "express";
import authentication from "../middleware/authentication";
import adminController from "../controllers/admin.controller";
import candidateController from "../controllers/candidate.controller";
import companyController from "../controllers/company.controller";
import jobController from "../controllers/job.controller";

const adminRouter = express.Router();

adminRouter.get('/get-candidate', [authentication], candidateController.getCandidates);
adminRouter.get('/get-company', [authentication], companyController.getAllCompanys);
adminRouter.get('/get-jobs', jobController.getAllJobs);
adminRouter.get('/get-total-applied', [authentication], jobController.getTotalCandidateApplied);
adminRouter.delete('/delete-candidate', [authentication], candidateController.deleteCandidate);
adminRouter.delete('/delete-company', [authentication], companyController.deleteCompany);
adminRouter.post('/restore-candidate', [authentication], candidateController.restoreCandidate);
adminRouter.post('/restore-company', [authentication], companyController.restoreCompany);
adminRouter.get('/get-profile', [authentication], adminController.getProfile);
adminRouter.put('/update-profile', [authentication], adminController.updateProfile);

export default adminRouter;