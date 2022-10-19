const socket = new WebSocket(`ws://${window.location.host}`);
const $messageForm = document.querySelector('#message');
const $nickNameForm = document.querySelector('#nickName');
const $messageList = document.querySelector('ul');

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

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = $messageForm.querySelector('input');
  const data = JSON.stringify({ type: 'message', payload: $input.value });
  socket.send(data);
  $input.value = '';
};

const handlenickNameSubmit = (event) => {
  event.preventDefault();
  const $input = $nickNameForm.querySelector('input');
  const data = JSON.stringify({ type: 'nickname', payload: $input.value });
  console.log(data);
  socket.send(data);
  $input.value = '';
};

$messageForm.addEventListener('submit', handleMessageSubmit);
$nickNameForm.addEventListener('submit', handlenickNameSubmit);
/* setTimeout(() => {
  socket.send('Hello from the browser!');
}, 10000);
 */
