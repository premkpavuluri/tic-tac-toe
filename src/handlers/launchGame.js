const { Game } = require('../app/Game');

const launchGame = (players, gameInfo) => (req, res) => {
  const [player1, player2] = players;

  if (gameInfo.game) {
    return;
  }

  gameInfo.game = new Game(1, player1, player2);
  gameInfo.id = 1;
};

module.exports = { launchGame };