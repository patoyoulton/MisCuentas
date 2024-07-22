const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const createAccountTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      name TEXT,
      type TEXT,
      initialBalance REAL,
      currency TEXT,
      bank TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
  return db.run(sql);
};

const createAccount = (account, callback) => {
  const sql = 'INSERT INTO accounts (userId, name, type, initialBalance, currency, bank) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [account.userId, account.name, account.type, account.initialBalance, account.currency, account.bank], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const findAccountsByUserId = (userId, callback) => {
  const sql = 'SELECT * FROM accounts WHERE userId = ?';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const deleteAccount = (id, callback) => {
    const sql = 'DELETE FROM accounts WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { message: 'Account deleted', id });
    });
  };
  
  const updateAccount = (account, callback) => {
    const sql = `
      UPDATE accounts
      SET name = ?, type = ?, initialBalance = ?, currency = ?, bank = ?
      WHERE id = ?
    `;
    db.run(sql, [
      account.name, account.type, account.initialBalance, account.currency, account.bank, account.id
    ], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { message: 'Account updated', id: account.id });
    });
  };

module.exports = {
  createAccountTable,
  createAccount,
  findAccountsByUserId,
  deleteAccount,
  updateAccount
};
