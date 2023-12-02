// import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// controllers
import { saveNewCapturedImage } from './controllers/capturedImagesController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 8900;
const DATABASE_URI = process.env.DATABASE_URI;

// const httpServer = createServer();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(
    DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    const expressServer = app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    });
    

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
            saveNewCapturedImage(data).then((result) => console.log(result));
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
}).catch(err => console.log(err.message));


