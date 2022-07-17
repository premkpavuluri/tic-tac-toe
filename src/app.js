const express = require('express');
const { gameStatus } = require("./handlers/gameStatus");
const { addPlayer } = require("./handlers/addPlayer");
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { updateGame } = require("./handlers/updateGame");
const { logRequest } = require("./handlers/logRequest");
const { gameDetails } = require("./handlers/gameDetails");
const { launchGame } = require("./handlers/launchGame");
const { authenticate } = require("./handlers/authenticate");

const createApp = () => {
  const app = express();
  const sessions = {};
  const players = [];
  const gameInfo = {};

  const middleware = [
    express.urlencoded({ extended: true }),
    express.json(),
    logRequest,
    injectCookie,
    injectSession(sessions),
  ];

  app.use(middleware);

  app.post('/join-game', addPlayer(players, sessions));
  app.use(authenticate);
  app.get('/game-status', gameStatus(players), launchGame(players, gameInfo));

  app.get('/game-details', gameDetails(gameInfo));
  app.post('/update-game', updateGame(gameInfo));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
