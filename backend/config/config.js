const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { logger } = require('../utils/logger');
const { createUserTable } = require('../models/userModel');
const { createAccountTable } = require('../models/accountModel');
const { createTransactionTable } = require('../models/transactionModel');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
let db;

const connectToDatabase = () => {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to the database', err);
      logger.error('Error connecting to the database', err);
      return;
    }
    console.log('Connected to the SQLite database');
    logger.info('Connected to the SQLite database');
    initializeDatabase();
  });
  return db;
};

const initializeDatabase = () => {
  createUserTable();
  createAccountTable();
  createTransactionTable();
};

module.exports = {
  connectToDatabase,
};
