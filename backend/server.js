const http = require('http');
const url = require('url');
const db = require('./db'); // ← käyttää SQLite-tietokantaa

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // CORS preflight
  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(204);
    res.end();
    return;
  }

  // --- REITIT ---

  // GET /rooms
  if (path === '/rooms' && method === 'GET') {
    db.all("SELECT * FROM rooms", (err, rows) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Tietokantavirhe" }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(rows));
      }
    });
  }

  // POST /rooms
  else if (path === '/rooms' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      db.run(
        `INSERT INTO rooms (name, capacity, description) VALUES (?, ?, ?)`,
        [data.name, data.capacity, data.description],
        function (err) {
          if (err) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Huoneen lisäys epäonnistui" }));
          } else {
            res.writeHead(201);
            res.end(JSON.stringify({ id: this.lastID }));
          }
        }
      );
    });
  }

  // DELETE /rooms/:id
  else if (path.startsWith('/rooms/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    db.run(`DELETE FROM rooms WHERE id = ?`, [id], function (err) {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Poisto epäonnistui" }));
      } else if (this.changes === 0) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Huonetta ei löytynyt" }));
      } else {
        res.writeHead(204);
        res.end();
      }
    });
  }

  // GET /bookings?date=YYYY-MM-DD
  else if (path === '/bookings' && method === 'GET') {
    const date = parsedUrl.query.date;
    db.all(`SELECT * FROM bookings WHERE date = ?`, [date], (err, rows) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Tietokantavirhe" }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(rows));
      }
    });
  }

// POST /bookings
else if (path === '/bookings' && method === 'POST') {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const data = JSON.parse(body);
    db.run(
      `INSERT INTO bookings (room_id, booker_id, date) VALUES (?, ?, ?)`,
      [data.room_id, data.booker_id, data.date],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            res.writeHead(409); // Tuplavaraus – conflict
            res.end(JSON.stringify({ error: "Huone on jo varattu kyseiselle päivälle" }));
          } else {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Varaus epäonnistui" }));
          }
        } else {
          res.writeHead(201);
          res.end(JSON.stringify({ id: this.lastID }));
        }
      }
    );
  });
}


  // DELETE /bookings/:id
  else if (path.startsWith('/bookings/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    db.run(`DELETE FROM bookings WHERE id = ?`, [id], function (err) {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Poisto epäonnistui" }));
      } else if (this.changes === 0) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Varausta ei löytynyt" }));
      } else {
        res.writeHead(204);
        res.end();
      }
    });
  }

// GET /my-bookings/:booker_id
else if (path.startsWith('/my-bookings/') && method === 'GET') {
  const booker_id = parseInt(path.split('/')[2]);
  const query = `
  SELECT bookings.id, bookings.date, rooms.name AS room_name, bookers.name AS booker_name
  FROM bookings
  JOIN rooms ON bookings.room_id = rooms.id
  JOIN bookers ON bookings.booker_id = bookers.id
  WHERE bookings.booker_id = ?
`;

  db.all(query, [booker_id], (err, rows) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Tietokantavirhe" }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    }
  });
}

// GET /bookers
else if (path === '/bookers' && method === 'GET') {
  db.all("SELECT * FROM bookers", (err, rows) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Tietokantavirhe" }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    }
  });
}

// GET /all-bookings
else if (path === '/all-bookings' && method === 'GET') {
  const query = `
    SELECT bookings.id, bookings.room_id, bookings.date, rooms.name AS room_name, bookers.name AS booker_name
    FROM bookings
    JOIN rooms ON bookings.room_id = rooms.id
    JOIN bookers ON bookings.booker_id = bookers.id
    ORDER BY bookings.date DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Tietokantavirhe" }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    }
  });
}


  // 404 fallback
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Reittiä ei löytynyt" }));
  }
});

// Palvelimen käynnistys
server.listen(3001, () => {
  console.log("Node API toimii osoitteessa http://localhost:3001");
});
