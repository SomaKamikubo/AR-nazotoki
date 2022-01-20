const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  console.log(`New connection! id: ${socket.id}, transport: ${socket.conn.transport.name}, from: ${socket.handshake.headers.referer}`);
  socket.data.roomId = socket.id; // joinRoomの前に参照しようとして死なないように入れておく。

  socket.on('echo', (text) => {
    console.log(`Echo: [${socket.id}] ${text}`);
  });

  socket.on('chat', (mes) => {
    io.in(socket.data.roomId).emit('chat', socket.id, mes);
    console.log(`Chat: [${socket.id}] ${mes}`);
  });

  socket.on('joinRoom', async (roomId, callback) => {
    socket.join(roomId);
    socket.data.roomId = roomId;
    const sockets = await io.in(roomId).fetchSockets();
    callback({
      roomId: roomId,
      playerCount: sockets.length,
    });
    console.log(`${socket.id} joined room ${roomId}`);
  });

  socket.on('setReadyGameStartState', async (ready) => {
    socket.data.isReadyGameStart = ready;
    const sockets = await io.in(socket.data.roomId).fetchSockets();
    const readyCount = sockets.filter(s => s.data.isReadyGameStart ?? false).length;
    io.in(socket.data.roomId).emit('changedReadyState', readyCount, sockets.length);
    console.log(`changedReadyState: ${readyCount}, ${sockets.length}`);
  });

  socket.on('syncTransform', async (objId, position, rotation, scale) => {
    socket.to(socket.data.roomId).emit('syncTransform', objId, position, rotation, scale);
    console.log(`syncTransform: ${objId}, ${position}, ${rotation}, ${scale}`);
  });
  socket.on('foundSyncedMarker', async (markerId) => {
    socket.to(socket.data.roomId).emit('foundSyncedMarker', markerId, socket.id);
    console.log(`foundMarker: ${markerId}, ${socket.id}`);
  });
  socket.on('lostSyncedMarker', async (markerId) => {
    socket.to(socket.data.roomId).emit('lostSyncedMarker', markerId, socket.id);
    console.log(`lostMarker: ${markerId}, ${socket.id}`);
  });
  socket.on('syncState', async (entityId, name, value) => {
    socket.to(socket.data.roomId).emit('syncState', entityId, name, value);
    console.log(`syncState: ${entityId}, ${name}, (${value})`);
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnect client (${reason}) id: ${socket.id}`);
  });
});

app.use('/', express.static('../web-dist'));
// app.use('/', express.static('./public'));

httpServer.listen(process.env.PORT ?? 80);
