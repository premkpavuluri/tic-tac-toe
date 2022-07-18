const authenticate = (req, res, next) => {
  if (!req.session) {
    res.sendStatus(403);
    return;
  }

  next();
};

module.exports = { authenticate };
