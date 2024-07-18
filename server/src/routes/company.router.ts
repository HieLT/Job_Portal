import express from "express";
import companyController from "../controllers/company.controller";
import authentication  from "../middleware/authentication";

const companyRouter = express.Router();

companyRouter.post('/create', [authentication], companyController.createCompany);
companyRouter.get('/get-profile', [authentication], companyController.getProfile);
companyRouter.post('/update-profile', [authentication], companyController.updateProfile);

export default companyRouter;