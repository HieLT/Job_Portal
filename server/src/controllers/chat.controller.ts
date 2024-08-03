import { Request, Response } from "express";
import chatService from "../services/chat.service";
import accountModel from "../models/account.model";

class ChatController {
    async getHistoryChatOfCandidate(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const conversations = await chatService.getHistoryChatOfCandidate(String(account._id));
                res.status(200).send(conversations);
            }
            else {
                res.status(401).send({ message: 'Account not found' });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }   

    async getHistoryChatOfCompany(req: Request, res: Response) {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const conversations = await chatService.getHistoryChatOfCompany(String(account._id));
                res.status(200).send(conversations);
            }
            else {
                res.status(401).send({ message: 'Account not found' });
            }
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }   

    async startConversation(req: Request, res: Response) : Promise<void> {
        try {
            const email = req.user;
            const account = await accountModel.findOne({email});
            if (account) {
                const {recipient} = req.query;
                const messages = await chatService.startConversation(String(account._id), String(recipient));
                res.status(200).send(messages);
            }
            else {
                res.status(401).send({message: 'Account not found'});
            }
        }
        catch(error: any) {
            res.status(500).send({message: error.message});
        }
    }
}

export default new ChatController();