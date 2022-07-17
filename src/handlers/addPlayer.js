const createSession = (username) => {
  const sessionId = new Date().getTime();
  return { sessionId, username };
};

const addPlayer = (players, sessions) => (req, res) => {
  const { username } = req.body;

  const session = createSession(username);
  sessions[session.sessionId] = session;

  const playerId = players.length + 1;
  const player = { name: username, playerId, moves: [] };
  players.push(player);

  res.cookie('sessionId', session.sessionId);
  res.status(201).json(player);
};

module.exports = { addPlayer };