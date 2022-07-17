const updateGame = (gameInfo) => (req, res) => {
  const { move } = req.body;
  const { game } = gameInfo;

  game.update(move);
  res.sendStatus(201);
};

module.exports = { updateGame };
