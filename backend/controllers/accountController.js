const accountModel = require('../models/accountModel');
const transactionModel = require('../models/transactionModel'); // Asegúrate de importar transactionModel
const { logger } = require('../utils/logger');

accountModel.createAccountTable();
transactionModel.createTransactionTable(); // Esto es opcional si necesitas crear la tabla aquí

const addAccount = (req, res) => {
  const { userId, name, type, initialBalance, currency, bank } = req.body;

  // Log incoming request data
  logger.info(`Received addAccount request: ${JSON.stringify(req.body)}`);
  console.log(`Received addAccount request: ${JSON.stringify(req.body)}`);

  accountModel.createAccount({ userId, name, type, initialBalance, currency, bank }, (err, account) => {
    if (err) {
      logger.error(`Error adding account: ${err.message}`);
      return res.status(500).send('Error adding the account');
    }
    logger.info(`Account added successfully: ${JSON.stringify(account)}`);
    res.status(200).send(account);
  });
};

const getAccounts = (req, res) => {
  const userId = req.userId;

  // Log incoming request data
  logger.info(`Received getAccounts request for userId: ${userId}`);
  console.log(`Received getAccounts request for userId: ${userId}`);

  accountModel.findAccountsByUserId(userId, (err, accounts) => {
    if (err) {
      logger.error(`Error fetching accounts: ${err.message}`);
      return res.status(500).send('Error fetching accounts');
    }

    // Para cada cuenta, obtenemos los ingresos y gastos
    const accountPromises = accounts.map(account => {
      return new Promise((resolve, reject) => {
        transactionModel.getTotalByAccount(account.id, (err, totals) => {
          if (err) {
            reject(err);
          } else {
            account.currentBalance = account.initialBalance + (totals.totalIncome || 0) - (totals.totalExpense || 0);
            resolve(account);
          }
        });
      });
    });

    Promise.all(accountPromises)
      .then(updatedAccounts => {
        res.status(200).send(updatedAccounts);
      })
      .catch(error => {
        logger.error(`Error updating accounts balance: ${error.message}`);
        res.status(500).send('Error updating accounts balance');
      });
  });
};

const deleteAccount = (req, res) => {
    const { id } = req.params;
    logger.info(`Attempting to delete account with id: ${id}`);
    accountModel.deleteAccount(id, (err, result) => {
      if (err) {
        logger.error(`Error deleting account: ${err.message}`);
        return res.status(500).send('Error deleting account');
      }
      logger.info(`Account deleted successfully: ${JSON.stringify(result)}`);
      res.status(200).send(result);
    });
  };
  
  const updateAccount = (req, res) => {
    const { id } = req.params;
    const { name, type, initialBalance, currency, bank } = req.body;
    const account = { id, name, type, initialBalance, currency, bank };
    logger.info(`Attempting to update account with id: ${id}`);
    accountModel.updateAccount(account, (err, result) => {
      if (err) {
        logger.error(`Error updating account: ${err.message}`);
        return res.status(500).send('Error updating account');
      }
      logger.info(`Account updated successfully: ${JSON.stringify(result)}`);
      res.status(200).send(result);
    });
  };
  

module.exports = {
  addAccount,
  getAccounts,
  deleteAccount,
  updateAccount
};
