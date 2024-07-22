const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = (username, password, email, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 8);

  userModel.createUser({ username, password: hashedPassword, email }, (err, user) => {
    if (err) {
      return callback(err);
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
    callback(null, { auth: true, token });
  });
};

const login = (username, password, callback) => {
  userModel.findUserByUsername(username, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback(null, { auth: false, message: 'No user found.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return callback(null, { auth: false, token: null });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });
    callback(null, { auth: true, token });
  });
};

module.exports = {
  register,
  login
};
