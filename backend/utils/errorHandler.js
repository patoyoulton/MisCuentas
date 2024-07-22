const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).send({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
