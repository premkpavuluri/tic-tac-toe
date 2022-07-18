const xhrRequest = (request, onStatus, handler, altHandler, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === onStatus) {
      return handler(xhr);
    }

    altHandler(xhr);
  }
  xhr.open(request.method, request.url);
  xhr.send(body);
};

const getFormData = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);

  return new URLSearchParams(formData);
};

const identity = (x) => x;

const redirectToBoard = (intervalId) => (xhr) => {
  const { isStarted } = JSON.parse(xhr.responseText);

  if (isStarted) {
    clearInterval(intervalId);
    window.location.href = 'board.html';
    return;
  }
};

const requestGameStatus = (xhr) => {
  const intervalId = setInterval(() => {
    const req = { method: 'GET', url: '/game-status' };
    xhrRequest(req, 200, redirectToBoard(intervalId), identity);
  }, 1000);
};

const joinGame = () => {
  const request = { method: 'POST', url: '/join-game' };
  const formData = getFormData();

  xhrRequest(request, 201, requestGameStatus, identity, formData);
};

const play = () => {
  const buttonElement = document.querySelector('#submit');
  buttonElement.onclick = joinGame;
};

window.onload = play;
