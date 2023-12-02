// import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const PORT = process.env.PORT || 8900;

// const httpServer = createServer();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});




// const io = new Server(httpServer, {
//     cors: {
//         origin: process.env.NODE_ENV === 'production' ? false : [
//             'http://127.0.0.1:5500',
//             'http://localhost:5500'
//         ]
//     }
// });

const io = new Server(expressServer, {
    cors: {
        origin: '*'
    }
});



io.on('connection', (socket) => {
    console.log(`CONNECTED -> ${socket.id}`);
    socket.on('message', (data) => {
        io.emit('message', `${data}`);
        console.log(`${socket.id}:${data}`);
    });
    socket.on('image_capture', (data) => {
        io.emit('image_capture', `${data}`);
    });
    socket.on('capture_image', (data) => {
        io.emit('capture_image', `${data}`);
    });
    socket.on('door_control', (data) => {
        io.emit('door_control', `${data}`);
        console.log(`${data}`);
    });
    socket.on('light_control', (data) => {
        io.emit('light_control', `${data}`);
        console.log(`${data}`);
    });
    socket.on('disconnect', () => {
        console.log(`DISCONNECTED -> ${socket.id}`);
    });
});





// httpServer.listen(PORT, () => {
//     console.log(`Listening on ${PORT}`);
// });

