const xhrRequest = (request, onStatus, handler, altHandler, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === onStatus) {
      return handler(xhr);
    }

    altHandler(xhr);
  }

  const contentType = request['content-type'] || 'text/plain';

  xhr.open(request.method, request.url);
  xhr.setRequestHeader('content-type', contentType);
  xhr.send(body);
};

const identity = (x) => x;

const renderCells = (cells, symbol) => {
  cells.forEach((cell) => {
    const cellElement = document.getElementById(cell.toString());
    cellElement.innerText = symbol;
  });
};

const renderBoard = (xhr) => {
  const { player1Moves, player2Moves } = JSON.parse(xhr.responseText);
  renderCells(player1Moves, 'X');
  renderCells(player2Moves, 'O');
};

const updateBoard = (xhr) => {
  const request = { method: 'GET', url: '/game-details' };
  xhrRequest(request, 200, renderBoard, identity);
};

const sendMove = (event) => {
  const req = {
    method: 'POST', url: '/update-game',
    'content-type': 'application/json'
  };
  const body = { move: +event.target.id };

  xhrRequest(req, 201, updateBoard, identity, JSON.stringify(body));
};

const play = () => {
  const board = document.querySelector('.board');
  board.onclick = sendMove;
};

window.onload = play;

