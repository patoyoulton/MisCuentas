const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { logger } = require('../utils/logger');

userModel.createUserTable();

const register = (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  logger.info(`Received register request: ${JSON.stringify(req.body)}`);
  console.log(`Received register request: ${JSON.stringify(req.body)}`);

  userModel.createUser({ username, password: hashedPassword, email }, (err, user) => {
    if (err) {
      logger.error(`Error registering user: ${err.message}`);
      return res.status(500).send('Error registering the user');
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
    logger.info(`User registered successfully: ${JSON.stringify(user)}`);
    res.status(200).send({ auth: true, token, user });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  logger.info(`Received login request: ${JSON.stringify(req.body)}`);
  console.log(`Received login request: ${JSON.stringify(req.body)}`);

  userModel.findUserByUsername(username, (err, user) => {
    if (err) {
      logger.error(`Error finding user: ${err.message}`);
      return res.status(500).send('Error on the server.');
    }
    if (!user) {
      logger.warn(`No user found for username: ${username}`);
      return res.status(404).send('No user found.');
    }

    logger.info(`User found: ${JSON.stringify(user)}`);
    console.log(`User found: ${JSON.stringify(user)}`);

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      logger.warn(`Invalid password for username: ${username}`);
      return res.status(401).send({ auth: false, token: null });
    }

    logger.info(`Password is valid for username: ${username}`);
    console.log(`Password is valid for username: ${username}`);

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
    logger.info(`Token generated for user: ${username}`);
    console.log(`Token generated for user: ${username}`);

    res.status(200).send({ auth: true, token, user });
  });
};

module.exports = {
  register,
  login
};
