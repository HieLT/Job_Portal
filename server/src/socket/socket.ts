import http from 'http';
import app from '../../server';
import {Server, Socket} from 'socket.io';
import accountModel from '../models/account.model';
import chatMessageModel from '../models/chatMessage.model';

const server = http.createServer(app);
const port = 8080;

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5174", "http://localhost:8000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

server.listen(port, () => {
    console.log(`Server socket is running on port ${port}`);
})

io.on('connection', async (socket: Socket) => {
    
    const user_id = socket.handshake.query["user_id"];
    console.log(`User connected with socket ID: ${user_id}`);

    if (user_id) {
        try {
            await accountModel.findByIdAndUpdate(user_id, {
                socket_id: socket.id
            });
        }
        catch(err:any) {
            console.log(err.message);
        }
    }

    socket.on('disconnect', async () => {
        console.log(`User disconnected with socket ID: ${socket.id}`);
    });

    socket.on('text_message', async (data: any) => {
        try {
            const {message, id_conversation, id_sender, id_recipient} = data;
            const sender = await accountModel.findByIdAndDelete(id_sender).select('socket_id');
            const recipient = await accountModel.findByIdAndDelete(id_recipient).select('socket_id');
            const newMessage = {
                to: id_recipient,
                from: id_sender,
                created_at: new Date(),
                type: 'Text',
                text: message
            };
            await chatMessageModel.findByIdAndUpdate(id_conversation, {
                $push: {
                    messages: newMessage
                }
            }, {new: true, validateModifiedOnly: true});

            io.to(sender?.socket_id ?? '').emit('message_sent', {
                _id: id_conversation,
                message: newMessage
            });
            io.to(recipient?.socket_id ?? '').emit('new_message', {
                _id: id_conversation,
                message: newMessage
            });
        }
        catch(err: any) {
            console.log(err.message);
        }
    })
});

export default io;