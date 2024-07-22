const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    logger.warn('No token provided.');
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      logger.error(`Failed to authenticate token: ${err.message}`);
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    logger.info(`Token authenticated successfully for userId: ${req.userId}`);
    next();
  });
};

module.exports = verifyToken;
