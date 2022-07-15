const express = require('express');

const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');

const logRequest = (req, res, next) => {
  console.log(req.method, req.path);

  next();
};

const joinPlayer = (sessions) => (req, res) => {
  const sessionId = new Date().getTime();
  const { username } = req.body;

  const session = { sessionId, username };
  sessions[sessionId] = session;

  res.cookie('sessionId', sessionId);
  res.sendStatus(201);
};

const gameStatus = (sessions) => (req, res, next) => {
  const playersCount = Object.keys(sessions).length;
  const isStarted = playersCount === 2;

  res.json({ isStarted });
};

const gameDetails = (game) => (req, res) => {
  res.json(game);
};

const hasPlayerWon = (playerMoves) => {
  const winningCombinations = [[1, 2, 3], [4, 5, 6]];

  return winningCombinations.some((combination) =>
    combination.every(move => playerMoves.includes(move))
  );
};

const updateGame = (game) => (req, res) => {
  const { move } = req.body;
  const { currentPlayer: currentPlayerName } = game;
  game[currentPlayerName].push(move);
  if (hasPlayerWon(game[currentPlayerName])) {
    game.result = currentPlayerName;
  } else {
    game.currentPlayer = currentPlayerName === 'player1' ? 'player2' : 'player1';
  }
  res.sendStatus(201);
};

const createApp = () => {
  const app = express();
  const sessions = {};
  const game = {
    player1: [],
    player2: [],
    currentPlayer: 'player1',
    result: 'inprogress'
  };

  const middleware = [
    express.json(),
    logRequest,
    injectCookie,
    injectSession(sessions),
  ];

  app.use(middleware);

  app.post('/join-game', joinPlayer(sessions));
  app.get('/game-status', gameStatus(sessions));
  app.get('/game-details', gameDetails(game));
  app.post('/update-game', updateGame(game));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
