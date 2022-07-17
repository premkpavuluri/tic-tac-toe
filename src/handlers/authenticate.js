const authenticate = (req, res, next) => {
  console.log(req.session);

  if (!req.session) {
    res.sendStatus(403);
    return;
  }

  next();
};

module.exports = { authenticate };
