const transactionModel = require('../models/transactionModel');

const addTransaction = (userId, accountId, type, category, amount, date, note, currency, callback) => {
  transactionModel.createTransaction({ userId, accountId, type, category, amount, date, note, currency }, (err, transaction) => {
    if (err) {
      return callback(err);
    }
    callback(null, transaction);
  });
};

const getTransactions = (userId, callback) => {
  transactionModel.findTransactionsByUserId(userId, (err, transactions) => {
    if (err) {
      return callback(err);
    }
    callback(null, transactions);
  });
};

module.exports = {
  addTransaction,
  getTransactions
};
