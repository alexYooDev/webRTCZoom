/* build connection */
const socket = io();

const welcome = document.getElementById('welcome');
const $form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

const greetParticipants = (participant) => {
  const $ul = room.querySelector('ul');
  const $li = document.createElement('li');
  $li.textContent = `${participant} joined the chat! - ${new Date().toLocaleTimeString()}`;
  $ul.appendChild($li);
};

/* Function triggered by BE done callback */
const showRoom = (msg) => {
  welcome.hidden = true;
  room.hidden = false;
  const roomTitle = room.querySelector('h3');
  roomTitle.innerText = `Room: ${roomName}`;
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const $input = $form.querySelector('input');
  socket.emit('enter_room', $input.value, showRoom);
  roomName = $input.value;
  $input.value = '';
};

$form.addEventListener('submit', handleRoomSubmit);

/* 해당 이벤트가 일어난 브라우저를 *제외하고* 모든 연결된 브라우저에 적용  */
socket.on('welcome', (payload) => greetParticipants(payload.participant));
