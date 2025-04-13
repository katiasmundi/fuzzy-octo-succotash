const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tilavaraus.sqlite');

// Taulujen luonti (jos eivät vielä ole olemassa)
db.serialize(() => {
  // HUONEET
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      capacity INTEGER,
      description TEXT
    )
  `);

  // VARAUKSET
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      booker_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    )
  `);

  // Lisää kaksi testihuonetta jos taulu on tyhjä
  db.get("SELECT COUNT(*) as count FROM rooms", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO rooms (name, capacity, description) VALUES ('Neukkari A', 6, '1. kerros')`);
      db.run(`INSERT INTO rooms (name, capacity, description) VALUES ('Neukkari B', 10, '2. kerros')`);
    }
  });
});

module.exports = db;
