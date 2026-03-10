const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

// enable WAL mode for better performance
db.pragma('journal_mode = WAL');

module.exports = db;