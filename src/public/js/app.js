/* build connection */
const socket = io();

const welcome = document.getElementById('welcome');
const $form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

const addMessage = (msg) => {
  const $ul = room.querySelector('ul');
  const $li = document.createElement('li');
  $li.textContent = msg;
  $ul.appendChild($li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const $input = room.querySelector('#message input');
  const value = $input.value;
  socket.emit('message', $input.value, roomName, () =>
    addMessage(`You: ${value}`)
  );
  $input.value = '';
};

/* Function triggered by BE done callback */
const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const roomTitle = room.querySelector('h3');
  roomTitle.innerText = `Room: ${roomName}`;
  const messageForm = room.querySelector('#message');
  messageForm.addEventListener('submit', handleMessageSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const $roomInput = $form.querySelector('#room-name');
  const $nickNameInput = $form.querySelector('#nick-name');
  socket.emit('enter_room', $roomInput.value, $nickNameInput.value, showRoom);
  roomName = $roomInput.value;
  nickName = $nickNameInput.value;
  $roomInput.value = '';
  $nickNameInput.value = '';
};


$form.addEventListener('submit', handleRoomSubmit);

/* 해당 이벤트가 일어난 브라우저를 *제외하고* 모든 연결된 브라우저에 적용  */
socket.on('welcome', (payload) =>
  addMessage(
    `${
      payload.participant
    } joined the chat! - ${new Date().toLocaleTimeString()}`
  )
);

socket.on('exit', (payload) => {
  addMessage(
    `${payload.participant} left the chat. - ${new Date().toLocaleTimeString()}`
  );
});

socket.on('message', (payload) => {
  addMessage(`${payload.nickname}: ${payload.message}`)
});
