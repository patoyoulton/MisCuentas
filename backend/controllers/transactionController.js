const transactionModel = require('../models/transactionModel');
const { logger } = require('../utils/logger');

const addTransaction = (req, res) => {
  const { userId, amount, note, type, category, date, currency, accountId } = req.body;

  logger.info(`Received addTransaction request: ${JSON.stringify(req.body)}`);
  console.log(`Received addTransaction request: ${JSON.stringify(req.body)}`);

  transactionModel.createTransaction({ userId, amount, note, type, category, date, currency, accountId }, (err, transaction) => {
    if (err) {
      logger.error(`Error adding transaction: ${err.message}`);
      return res.status(500).send('Error adding the transaction');
    }
    logger.info(`Transaction added successfully: ${JSON.stringify(transaction)}`);
    res.status(200).send(transaction);
  });
};

const getTransactions = (req, res) => {
  const userId = req.userId;

  logger.info(`Received getTransactions request for userId: ${userId}`);
  console.log(`Received getTransactions request for userId: ${userId}`);

  transactionModel.findTransactionsByUserId(userId, (err, transactions) => {
    if (err) {
      logger.error(`Error fetching transactions: ${err.message}`);
      return res.status(500).send('Error fetching transactions');
    }
    logger.info(`Transactions fetched successfully for userId: ${userId}`);
    res.status(200).send(transactions);
  });
};

const deleteTransaction = (req, res) => {
    const { id } = req.params;
    logger.info(`Attempting to delete transaction with id: ${id}`);
    transactionModel.deleteTransaction(id, (err, result) => {
      if (err) {
        logger.error(`Error deleting transaction: ${err.message}`);
        return res.status(500).send('Error deleting transaction');
      }
      logger.info(`Transaction deleted successfully: ${JSON.stringify(result)}`);
      res.status(200).send(result);
    });
  };
  
  const updateTransaction = (req, res) => {
    const { id } = req.params;
    const { amount, note, type, category, date, currency, accountId } = req.body;
    const transaction = { id, amount, note, type, category, date, currency, accountId };
    logger.info(`Attempting to update transaction with id: ${id}`);
    transactionModel.updateTransaction(transaction, (err, result) => {
      if (err) {
        logger.error(`Error updating transaction: ${err.message}`);
        return res.status(500).send('Error updating transaction');
      }
      logger.info(`Transaction updated successfully: ${JSON.stringify(result)}`);
      res.status(200).send(result);
    });
  };

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
};
