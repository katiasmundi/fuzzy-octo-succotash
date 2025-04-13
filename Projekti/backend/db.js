const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tilavaraus.sqlite');

// Taulujen luonti (jos ei ole vielä olemassa)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      capacity INTEGER,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER,
      booker_id INTEGER,
      date TEXT
    )
  `);

  // Testihuoneet jos ei vielä mitään
  db.all("SELECT COUNT(*) as count FROM rooms", (err, rows) => {
    if (rows[0].count === 0) {
      db.run(`INSERT INTO rooms (name, capacity, description) VALUES ('Neukkari A', 6, '1. kerros')`);
      db.run(`INSERT INTO rooms (name, capacity, description) VALUES ('Neukkari B', 10, '2. kerros')`);
    }
  });
});

module.exports = db;
