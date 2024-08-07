import express from 'express';
import chatController from '../controllers/chat.controller';
import authentication from '../middleware/authentication';

const chatRouter = express.Router();

// chatRouter.get('/get-history-chat', [authentication], chatController.getHistoryChat);
chatRouter.get('/start-conversation', [authentication], chatController.startConversation);

export default chatRouter;