/* build connection */
const socket = io();

const welcome = document.getElementById('welcome');
const $form = welcome.querySelector('form');

/* Function triggered by BE done callback */
const backEndCompleted = (msg) => {
  console.log('The argument sent from the server: ', msg);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const $input = $form.querySelector('input');
  socket.emit('enter_room', { payload: $input.value }, backEndCompleted);
  $input.value = '';
};

$form.addEventListener('submit', handleRoomSubmit);
