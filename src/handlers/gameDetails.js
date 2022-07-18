const gameDetails = (gameInfo) => (req, res) => {
  const { game } = gameInfo;
  const state = game.getState();
  const { sessionId } = req.session;
  const isMyTurn = sessionId === state.currentPlayer.id;
  const { player1Moves, player2Moves, status } = state;

  res.json({ player1Moves, player2Moves, isMyTurn, status });
};

module.exports = { gameDetails };
