const hasPlayerWon = (playerMoves) => {
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  return winningCombinations.some((combination) => combination.every(move => playerMoves.includes(move))
  );
};

class Game {
  #id;
  #player1;
  #player2;
  #currentPlayer;

  constructor(id, player1, player2) {
    this.#id = id;
    this.#player1 = player1;
    this.#player2 = player2;
    this.#currentPlayer = player1;
  }

  #isFirstPlayer() {
    return this.#currentPlayer === this.#player1;
  }

  #changeCurrentPlayer() {
    this.#currentPlayer = this.#isFirstPlayer() ? this.#player2 : this.#player1;
  }

  update(move) {
    this.#currentPlayer.moves.push(move);
    if (hasPlayerWon(this.#currentPlayer.moves)) {
      return;
    }
    this.#changeCurrentPlayer();
  }

  #getGameStatus() {
    return hasPlayerWon(this.#currentPlayer.moves) ? this.#currentPlayer.name : 'inprogress';
  }

  getState() {
    return {
      player1Moves: this.#player1.moves,
      player2Moves: this.#player2.moves,
      currentPlayer: {
        id: this.#currentPlayer.id,
        name: this.#currentPlayer.name
      },
      status: this.#getGameStatus(),
    };
  }
}

module.exports = { Game };
