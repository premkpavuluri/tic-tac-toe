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
  const players = [];
  let game;

  const middleware = [
    express.json(),
    logRequest,
    injectCookie,
    injectSession(sessions),
  ];

  app.use(middleware);

  app.post('/join-game', addPlayer(players, sessions));
  app.get('/game-status', gameStatus(players));
  app.get('/game-details', gameDetails(game));
  app.post('/update-game', updateGame(game));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
