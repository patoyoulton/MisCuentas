const userModel = require('../models/userModel');
const { logger } = require('../utils/logger');

const getUserById = (id, callback) => {
  logger.info(`Fetching user with ID: ${id}`);
  userModel.findUserById(id, (err, user) => {
    if (err) {
      logger.error(`Error fetching user with ID ${id}: ${err.message}`);
    } else {
      logger.info(`Fetched user: ${JSON.stringify(user)}`);
    }
    callback(err, user);
  });
};

const updateUserById = (id, user, callback) => {
  logger.info(`Updating user with ID: ${id}`);
  logger.info(`User data: ${JSON.stringify(user)}`);
  userModel.updateUser(id, user, (err, result) => {
    if (err) {
      logger.error(`Error updating user with ID ${id}: ${err.message}`);
    } else {
      logger.info(`Updated user: ${JSON.stringify(result)}`);
    }
    callback(err, result);
  });
};

module.exports = {
  getUserById,
  updateUserById
};
