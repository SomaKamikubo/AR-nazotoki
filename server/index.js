const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('new connection!');
  console.log(socket);
});

app.route('/game/*').get((req, res) => {
  // proxy
});


httpServer.listen(8000);
