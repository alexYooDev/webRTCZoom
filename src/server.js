import express from 'express';
import http from 'http';
import WebSocket from 'ws';

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

const server = http.createServer(app);
//ws server with the same port
const wss = new WebSocket.Server({ server });

const sockets = [];

const onSocketClose = () => {
  console.log('Disconnected from the broswer!');
};

wss.on('connection', (socket) => {
  sockets.push(socket);

  console.log('Connected to the browser!');
  socket.on('close', onSocketClose);
  socket.on('message', (message) => {
    sockets.forEach((_socket) => _socket.send(message.toString()));
  });
});

server.listen(PORT, handleListen);
