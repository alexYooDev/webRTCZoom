import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const httpServer = http.createServer(app);
const wsIOServer = new Server(httpServer);

wsIOServer.on('connection', (socket) => {
  socket['nickname'] = 'Anonymous'
  socket.onAny((event, ...args) => {
    console.log(`got socket event: ${event}`);
  });

  socket.on('enter_room', (roomName, nickName, done) => {
    socket.join(roomName);
    socket['nickname'] = nickName;
    /* done : ONLY TRIGGERS function in the fe, not executing it in the server side
     */
    done();
    socket.to(roomName).emit('welcome', { participant: nickName });
  });

  socket.on('message', (msg, roomName, done) => {
    socket.to(roomName).emit('message', { nickname: socket.nickname, message: msg });
    done();
  });

  socket.on('nickname', nickname => (socket['nickname'] = nickname))
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('exit', { participant: 'Anonymous' })
    );
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
