const gameStatus = (sessions) => (req, res, next) => {
  const playersCount = Object.keys(sessions).length;
  const isStarted = playersCount === 2;

  res.json({ isStarted });
};

exports.gameStatus = gameStatus;
