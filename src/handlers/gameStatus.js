const gameStatus = (players) => (req, res, next) => {
  const isStarted = players.length === 2;

  res.json({ isStarted });
};

exports.gameStatus = gameStatus;
