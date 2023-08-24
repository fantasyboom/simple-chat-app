const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server);
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 4000; // Use the provided port or default to 3000

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

let userCount = 0;

io.on('connection', (socket) => {
    // Increment user count and emit to all clients
    userCount++;
    io.emit('user count', userCount);

    // Handle user disconnection
    socket.on('disconnect', () => {
        // Decrement user count and emit to all clients
        userCount--;
        io.emit('user count', userCount);
    });

    // ... (existing socket.on code) ...
});

