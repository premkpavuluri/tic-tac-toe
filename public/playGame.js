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

const updateMessage = (message) => {
  const messageEle = document.getElementById('message');

  messageEle.innerText = message;
};

const disableCells = () => {
  const board = document.querySelector('.board');
  board.removeEventListener('onclick', validateMove);
};

const renderCells = (cells, symbol) => {
  cells.forEach((cell) => {
    const cellElement = document.getElementById(cell.toString());
    cellElement.innerText = symbol;
  });
};

const renderBoard = (xhr) => {
  const { player1Moves, player2Moves, status, result } = JSON.parse(xhr.responseText);

  renderCells(player1Moves, 'X');
  renderCells(player2Moves, 'O');


  if (status === 'won') {
    console.log(result);
    updateMessage(`${result} has won the match`);
    disableCells();
    return;
  }
};

const updateBoard = (xhr) => {
  const request = { method: 'GET', url: '/game-details' };
  xhrRequest(request, 200, renderBoard, identity);
};

const sendMove = (move) => {
  const req = {
    method: 'POST', url: '/update-game',
    'content-type': 'application/json'
  };

  const body = { move };

  xhrRequest(req, 201, updateBoard, identity, JSON.stringify(body));
};

const validateMove = (event) => {
  const req = { method: 'GET', url: '/game-details' };
  const move = +event.target.id;

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const { isMyTurn } = JSON.parse(xhr.responseText);
    if (isMyTurn) {
      sendMove(move);
    }
  };

  xhr.open(req.method, req.url);
  xhr.send();
};

const play = () => {
  const board = document.querySelector('.board');
  board.onclick = validateMove;

  const intervalId = setInterval(() => {
    updateBoard();
  }, 1000);
};

window.onload = play;
