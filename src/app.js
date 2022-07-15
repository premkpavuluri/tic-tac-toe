const express = require('express');
const { gameStatus } = require("./handlers/gameStatus");
const { addPlayer } = require("./handlers/addPlayer");
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { updateGame } = require("./handlers/updateGame");
const { logRequest } = require("./handlers/logRequest");
const { gameDetails } = require("./handlers/gameDetails");

const createApp = () => {
  const app = express();
  const sessions = {};
  const game = {
    player1: [],
    player2: [],
    currentPlayer: 'player1',
    status: 'inprogress'
  };

  const middleware = [
    express.json(),
    logRequest,
    injectCookie,
    injectSession(sessions),
  ];

  app.use(middleware);

  app.post('/join-game', addPlayer(sessions));
  app.get('/game-status', gameStatus(sessions));
  app.get('/game-details', gameDetails(game));
  app.post('/update-game', updateGame(game));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
