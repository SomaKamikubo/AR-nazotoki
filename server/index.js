const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket) => {
  console.log('new connection!');
  console.log("initial transport", socket.conn.transport.name); // prints polling or websocket
  socket.on('echo', (text) => {
    console.log(`${socket.id}: ${text}`);
    socket.emit('echo', 'Hello from server!');
  });
  socket.on('disconnect', (reason) => {
    console.log(`disconnect client (${reason})`);
  });
});

app.use('/', express.static('public'));

httpServer.listen(8000);
