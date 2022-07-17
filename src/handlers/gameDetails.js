const gameDetails = (gameInfo) => (req, res) => {
  const { game } = gameInfo;

  res.json(game.getState());
};

module.exports = { gameDetails };
