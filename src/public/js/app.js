/* build connection */
const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute')
const cameraBtn = document.getElementById('camera');
const cameraSelect = document.getElementById('cameras');

let myStream;
let muted = false;
let cameraOff = false;

const getCameras = async () => {
  try {
    const devices = (await navigator.mediaDevices.enumerateDevices());
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    
    cameras.forEach(camera => {
      const $option = document.createElement('option');
      $option.innerText = camera.label.split('(')[0];
      $option.value = camera.deviceId;
      cameraSelect.appendChild($option);
    });

  } catch (error) {
    console.log(error);
  }
}

const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    myFace.srcObject = myStream;
    await getCameras();
  } catch(error) {
    console.log(error);
  }
};

getMedia();

const handleMuteClick = () => {
  myStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
  if (!muted) {
    muteBtn.innerText = 'UnMute';
    muted = true;
  } else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
}

const handleCameraClick = () => {
  myStream.getVideoTracks().forEach(track => track.enabled = !track.enabled)
  if (!cameraOff) {
    cameraBtn.innerText = 'Camera On'
    cameraOff = true;
  } else {
    cameraBtn.innerText = 'Camera Off'
    cameraOff = false;
  }
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCameraClick);