const socket = new WebSocket(`ws://${window.location.host}`);

const handleSockectMessage = (message) => {
  console.log(message.toString('utf9'));
  console.log(`New message: "${message.data}"`);
};

socket.addEventListener('open', () => {
  console.log('Connected to the server!');
});

socket.addEventListener('message', handleSockectMessage);

socket.addEventListener('close', () => {
  console.log('Disconnected from the server!');
});

setTimeout(() => {
  socket.send('Hello from the browser!');
}, 10000);
