import {io} from 'socket.io-client'


const URL = "http://localhost:5000";

export const connectSocket = () => {
    const socket = io(URL);
    socket.connect()
}

export const disconnectSocket = () => {
    const socket = io(URL);
    
    if(socket.connected()){
        socket.disconnect();
    }
}
