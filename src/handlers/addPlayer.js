const addPlayer = (sessions) => (req, res) => {
  const sessionId = new Date().getTime();
  const { username } = req.body;

  const session = { sessionId, username };
  sessions[sessionId] = session;

  res.cookie('sessionId', sessionId);
  res.sendStatus(201);
};
exports.addPlayer = addPlayer;
