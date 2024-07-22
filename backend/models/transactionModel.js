const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const createTransactionTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      amount REAL,
      note TEXT,
      type TEXT,
      category TEXT,
      date TEXT,
      currency TEXT,
      accountId INTEGER,
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (accountId) REFERENCES accounts(id)
    )
  `;
  return db.run(sql);
};

const createTransaction = (transaction, callback) => {
  const sql = `INSERT INTO transactions (userId, amount, note, type, category, date, currency, accountId)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [
    transaction.userId, transaction.amount, transaction.note, transaction.type,
    transaction.category, transaction.date, transaction.currency, transaction.accountId
  ], function (err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const findTransactionsByUserId = (userId, callback) => {
  const sql = 'SELECT * FROM transactions WHERE userId = ?';
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const findTransactionsByAccountId = (accountId, callback) => {
  const sql = 'SELECT * FROM transactions WHERE accountId = ?';
  db.all(sql, [accountId], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

const getTotalByAccount = (accountId, callback) => {
    const sql = `
        SELECT
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as totalExpense
        FROM transactions
        WHERE accountId = ?
    `;
    db.get(sql, [accountId], (err, row) => {
        if (err) {
        return callback(err);
        }
        callback(null, row);
    });
};
  
const deleteTransaction = (id, callback) => {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    db.run(sql, [id], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { message: 'Transaction deleted', id });
    });
  };
  
const updateTransaction = (transaction, callback) => {
const sql = `
    UPDATE transactions
    SET amount = ?, note = ?, type = ?, category = ?, date = ?, currency = ?, accountId = ?
    WHERE id = ?
`;
db.run(sql, [
    transaction.amount, transaction.note, transaction.type, transaction.category,
    transaction.date, transaction.currency, transaction.accountId, transaction.id
], function(err) {
    if (err) {
    return callback(err);
    }
    callback(null, { message: 'Transaction updated', id: transaction.id });
});
};

module.exports = {
  createTransactionTable,
  createTransaction,
  findTransactionsByUserId,
  findTransactionsByAccountId,
  getTotalByAccount,
  deleteTransaction,
  updateTransaction
};
