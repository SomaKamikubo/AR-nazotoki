const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  console.log(`New connection! id: ${socket.id}, transport: ${socket.conn.transport.name}`);

  socket.on('echo', (text) => {
    console.log(`${socket.id}: ${text}`);
    socket.emit('echo', 'Hello from server!');
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('setReadyGameStartState', (ready) => {
    socket.data.isReadyGameStart = ready;
    // TODO
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnect client (${reason}) id: ${socket.id}`);
  });
});

app.use('/', express.static('../web-dist'));
// app.use('/', express.static('./public'));

httpServer.listen(process.env.PORT ?? 80);
