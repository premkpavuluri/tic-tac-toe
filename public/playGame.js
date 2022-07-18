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

const identity = (x) => x;

const updateBoard = (xhr) => {
  console.log(xhr);
};

const sendMove = (event) => {
  const req = { method: 'POST', url: '/update-game' }
  const body = { move: event.target.id };

  xhrRequest(req, 201, updateBoard, identity, body);
};

const play = () => {
  const board = document.querySelector('.board');
  board.onclick = sendMove;
};

window.onload = play;
