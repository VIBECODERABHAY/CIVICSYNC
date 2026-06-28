const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'db', 'civilians.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
});

db.serialize(() => {
  console.log('--- USERS TABLE ---');
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) throw err;
    console.table(rows);
    
    console.log('\n--- COMPLAINTS TABLE ---');
    db.all('SELECT id, user_id, title, address, severity, priority, status FROM complaints', [], (err, rows) => {
      if (err) throw err;
      console.table(rows);
      db.close();
    });
  });
});
