import chatMessageModel, {IChatMessage} from "../models/chatMessage.model";

class ChatService {
    async getHistoryChat(user_id: string) : Promise<IChatMessage[]> {
        try {
            const conversations : IChatMessage[] = await chatMessageModel.find({
                participants: {$in: [user_id]}
            }).populate('participants', '_id company candidate socket_id').exec();

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

    async startConversation(from: string, to: string) : Promise<IChatMessage | null> {
        try {
            const conversation = await chatMessageModel.findOne({
                participants: [from, to]
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
};

export default new ChatService();