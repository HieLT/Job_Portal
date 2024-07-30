import http from 'http';
import app from '../../server';
import {Server, Socket} from 'socket.io';
import accountModel from '../models/account.model';

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
    console.log(`User connecter with socket ID: ${user_id}`);

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

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

export default io;