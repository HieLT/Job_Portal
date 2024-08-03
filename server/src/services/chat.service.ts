import { Schema } from "mongoose";
import chatMessageModel, {IChatMessage} from "../models/chatMessage.model";

interface Message {
    to: string;
    from: string;
    type: 'Text' | 'Media' | 'Document' | 'Link' | 'Image';
    created_at: Date;
    text?: string;
    file?: string;
}

class ChatService {
    async getHistoryChatOfCandidate(user_id: string) : Promise<IChatMessage[]> {
        try {
            const conversations : IChatMessage[] = await chatMessageModel.find({
                participants: {$in: [user_id]}
            }).populate({
                path: 'participants', 
                select: '_id company socket_id',
                populate: {
                    path: 'company',
                    select: '_id name logo'
                }
            }).exec();

            conversations.sort(function(a : IChatMessage, b : IChatMessage) {
                if (a.messages.length === b.messages.length) {
                    return b.createdAt.getTime() - a.createdAt.getTime();
                }
                 else if (b.messages.length === 0) {
                    return b.createdAt.getTime() - a.messages[a.messages.length-1].created_at.getTime();
                }
                else if (a.messages.length === 0) {
                    return b.messages[b.messages.length-1].created_at.getTime() - a.createdAt.getTime();
                }
                else {
                    return b.messages[b.messages.length-1].created_at.getTime() - a.messages[a.messages.length-1].created_at.getTime();
                }
            })

            return conversations;
        }
        catch (error) {
            throw error;
        }
    }

    async getHistoryChatOfCompany(user_id: string) : Promise<IChatMessage[]> {
        try {
            const conversations : IChatMessage[] = await chatMessageModel.find({
                participants: {$in: [user_id]}
            }).populate({
                path: 'participants', 
                select: '_id candidate socket_id',
                populate: {
                    path: 'candidate',
                    select: '_id first_name last_name avatar'
                }
            }).exec();

            conversations.sort(function(a : IChatMessage, b : IChatMessage) {
                if (a.messages.length === b.messages.length) {
                    return b.createdAt.getTime() - a.createdAt.getTime();
                }
                 else if (b.messages.length === 0) {
                    return b.createdAt.getTime() - a.messages[a.messages.length-1].created_at.getTime();
                }
                else if (a.messages.length === 0) {
                    return b.messages[b.messages.length-1].created_at.getTime() - a.createdAt.getTime();
                }
                else {
                    return b.messages[b.messages.length-1].created_at.getTime() - a.messages[a.messages.length-1].created_at.getTime();
                }
            })

            return conversations;
        }
        catch (error) {
            throw error;
        }
    }

    async startConversation(from: string, to: string) : Promise<IChatMessage |null> {
        try {
            const conversation = await chatMessageModel.findOne({
                participants: {$size: 2, $all: [from, to]}
            }).exec();

            if (conversation) {
                return conversation;
            }
            else {
                const newConversation = new chatMessageModel({
                    participants: [from, to]
                });
                await newConversation.save();
                return newConversation;
            }
        }
        catch (error) {
            throw error;
        }
    }

    // async getMessages(id_conversation: string) : Promise<Message[]> {
    //     try {
    //         const conversation = await chatMessageModel.findById(id_conversation).select('messages');
    //         const messages : Message[] = [];
    //         if (conversation) {
    //             for (const x of conversation?.messages) {
    //                 messages.push({
    //                     to: String(x.to),
    //                     from: String(x.from),
    //                     type: x.type,
    //                     created_at: x.created_at,
    //                     text: x.text,
    //                     file: x.file
    //                 });
    //             }
    //         }
    //         return messages;
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }
};

export default new ChatService();