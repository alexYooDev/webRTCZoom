const socket = new WebSocket(`ws://${window.location.host}`);
const $messageForm = document.querySelector('form');
const $messageList = document.querySelector('ul');

const handleSockectMessage = (message) => {
  console.log(`New message: "${message.data}"`);
};

socket.addEventListener('open', () => {
  console.log('Connected to the server!');
});

socket.addEventListener('message', handleSockectMessage);

socket.addEventListener('close', () => {
  console.log('Disconnected from the server!');
});

const handleSubmit = (event) => {
  event.preventDefault();
  const $input = $messageForm.querySelector('input');
  socket.send($input.value);
  $input.value = '';
};

$messageForm.addEventListener('submit', handleSubmit);

/* setTimeout(() => {
  socket.send('Hello from the browser!');
}, 10000);
 */
