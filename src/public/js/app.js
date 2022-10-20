const socket = new WebSocket(`ws://${window.location.host}`);
const $messageForm = document.querySelector('#message');
const $nickNameForm = document.querySelector('#nickname');
const $messageList = document.querySelector('ul');

const makeMessage = (type, payload) => {
  const message = { type, payload };
  return JSON.stringify(message);
};

const handleSockectMessage = (message) => {
  const li = document.createElement('li');
  li.textContent = message.data;
  $messageList.append(li);
};

socket.addEventListener('open', () => {
  console.log('Connected to the server!');
});

socket.addEventListener('message', handleSockectMessage);

socket.addEventListener('close', () => {
  console.log('Disconnected from the server!');
});

const handleNickNameSubmit = (event) => {
  event.preventDefault();
  const $input = $nickNameForm.querySelector('input');
  const data = makeMessage('nickname', $input.value);
  socket.send(data);
  $input.value = '';
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = $messageForm.querySelector('input');
  const data = makeMessage('message', $input.value);
  socket.send(data);
  const li = document.createElement('li');
  li.textContent = `You: ${$input.value}`;
  $messageList.append(li);
  $input.value = '';
};

$messageForm.addEventListener('submit', handleMessageSubmit);
$nickNameForm.addEventListener('submit', handleNickNameSubmit);
/* setTimeout(() => {
  socket.send('Hello from the browser!');
}, 10000);
 */
