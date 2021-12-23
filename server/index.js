const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  console.log(`New connection! id: ${socket.id}, transport: ${socket.conn.transport.name}, from: ${socket.handshake.headers.referer}`);

  socket.on('echo', (text) => {
    console.log(`Echo: [${socket.id}] ${text}`);
  });

  socket.on('chat', (mes) => {
    io.in(socket.data.roomId).emit('chat', socket.id, mes);
    console.log(`Chat: [${socket.id}] ${mes}`);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.data.roomId = roomId;
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('setReadyGameStartState', async (ready) => {
    socket.data.isReadyGameStart = ready;
    const sockets = await io.in(socket.data.roomId).fetchSockets();
    const readyCount = sockets.filter(s => s.data.isReadyGameStart ?? false).length;
    io.in(socket.data.roomId).emit('changedReadyState', readyCount, sockets.length);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnect client (${reason}) id: ${socket.id}`);
  });
});

app.use('/', express.static('../web-dist'));
// app.use('/', express.static('./public'));

httpServer.listen(process.env.PORT ?? 80);
