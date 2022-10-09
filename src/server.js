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
  ad;
});

app.get('/*', (req, res) => {
  res.redirect('/');
});

const handleListen = () => console.log(`Listening on http://localhost:${PORT}`);

const server = http.createServer(app);
//ws server with the same port
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  socket.send('hello this is my first message!');
});

server.listen(PORT, handleListen);
