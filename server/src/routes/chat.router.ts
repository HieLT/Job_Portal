import express from 'express';
import chatController from '../controllers/chat.controller';
import authentication from '../middleware/authentication';

const chatRouter = express.Router();

chatRouter.get('/get-history-chat', [authentication], chatController.getHistoryChat);

export default chatRouter;