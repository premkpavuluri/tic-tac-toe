const hasPlayerWon = (playerMoves) => {
  const winningCombinations = [[1, 2, 3], [4, 5, 6]];

  return winningCombinations.some((combination) => combination.every(move => playerMoves.includes(move))
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

module.exports = { updateGame };
