import io from 'socket.io-client'

class SocketService {
    constructor() {
        this.socket = null
    }

    initSocket(authUserId) {
        this.socket = io(import.meta.env.VITE_SOCKET_DOMAIN, {
            query: {
                "user_id": authUserId
            }
        })
    }

    getSocket() {
        if (!this.socket) {
            this.initSocket()
        }
        return this.socket
    }

    disconnectSocket() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    createNewSocket(authUserId) {
        this.disconnectSocket()
        this.initSocket(authUserId)
    }
}

const socketService = new SocketService()

export default socketService
