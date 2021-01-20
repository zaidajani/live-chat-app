const express = require('express');
const path = require('path');
const socket = require('socket.io');
const port = process.env.PORT || 3000;
const app = express();
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use('/', express.static(path.join(__dirname + '/public')));

const io = socket(server);

io.sockets.on('connection', (socket) => {
  console.log('new connection', socket.id);
  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });
});