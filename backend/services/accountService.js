const accountModel = require('../models/accountModel');

const addAccount = (userId, name, type, initialBalance, currency, bank, callback) => {
  accountModel.createAccount({ userId, name, type, initialBalance, currency, bank }, (err, account) => {
    if (err) {
      return callback(err);
    }
    callback(null, account);
  });
};

const getAccounts = (userId, callback) => {
  accountModel.findAccountsByUserId(userId, (err, accounts) => {
    if (err) {
      return callback(err);
    }
    callback(null, accounts);
  });
};

module.exports = {
  addAccount,
  getAccounts
};
