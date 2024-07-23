import authentication from "../middleware/authentication";
import jobController from "../controllers/job.controller";
import express from "express";

const jobRouter = express.Router();

jobRouter.post("/create", authentication, jobController.createJob);

export default jobRouter;