import express from 'express';
import authentication from '../middleware/authentication';
import applicationController from '../controllers/application.controller';

const applicationRouter = express.Router();

applicationRouter.put('/update-seen-at', [authentication], applicationController.updateSeen);
applicationRouter.put('/update-downloaded-at', [authentication], applicationController.updateDownloaded);

export default applicationRouter;