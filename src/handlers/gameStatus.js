const gameStatus = (players) => (req, res, next) => {
  const isStarted = players.length === 2;

  res.json({ isStarted });
  if (isStarted) {
    console.log('In here');
    next();
  }
};

exports.gameStatus = gameStatus;
