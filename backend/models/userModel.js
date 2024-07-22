const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath);

const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      email TEXT UNIQUE,
      firstName TEXT,
      lastName TEXT,
      phone TEXT,
      gender TEXT,
      birthday TEXT,
      profileImage TEXT
    )
  `;
  return db.run(sql);
};

const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.run(sql, [user.username, user.password, user.email], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const findUserByUsername = (username, callback) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

const updateUser = (id, user, callback) => {
  const sql = `
    UPDATE users SET 
      firstName = ?, 
      lastName = ?, 
      phone = ?, 
      gender = ?, 
      birthday = ?, 
      profileImage = ? 
    WHERE id = ?
  `;
  db.run(
    sql,
    [user.firstName, user.lastName, user.phone, user.gender, user.birthday, user.profileImage, id],
    function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { changes: this.changes });
    }
  );
};

const findUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

module.exports = {
  createUserTable,
  createUser,
  findUserByUsername,
  updateUser,
  findUserById
};
