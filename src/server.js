import express from 'express';
import http from 'http';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app);
const wsIOServer = SocketIO(httpServer);

wsIOServer.on('connection', (socket) => {
  socket.onAny((event, ...args) => {
    console.log(`got socket event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    /* done : ONLY TRIGGERS function in the fe, not executing it in the server side
     */
    done();
    socket.to(roomName).emit('welcome', { participant: 'Anonymous' });
  });
});

//ws server with the same port

// const wss = new WebSocket.Server({ server });

/* const sockets = [];

const onSocketClose = () => {
  console.log('Disconnected from the broswer!');
};

wss.on('connection', (socket) => {
  sockets.push(socket);
  socket.nickname = 'Anonymous';
  console.log('Connected to the browser!');
  socket.on('close', onSocketClose);

  socket.on('message', (msg) => {
    const data = JSON.parse(msg);

    switch (data.type) {
      case 'message':
        sockets.forEach((_socket) =>
          _socket.send(`${socket.nickname}: ${data.payload}`)
        );
      case 'nickname':
        socket['nickname'] = data.payload;
    }
  });
}); */

httpServer.listen(PORT, handleListen);
