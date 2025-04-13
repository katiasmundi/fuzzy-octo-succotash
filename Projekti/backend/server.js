const http = require('http');
const url = require('url');

// "Tietokannat" muistiin
let rooms = [
  { id: 1, name: "Neukkari A", capacity: 6, description: "1. kerros" },
  { id: 2, name: "Neukkari B", capacity: 10, description: "2. kerros" }
];

let bookings = []; // { id, room_id, booker_id, date }

// Palvelimen luonti
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Asetetaan headerit
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Preflight-tuki (CORS)
  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(204);
    res.end();
    return;
  }

  // Reitit

  // 1. GET /rooms
  if (path === '/rooms' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify(rooms));
  }

  // 2. GET /bookings?date=YYYY-MM-DD
  else if (path === '/bookings' && method === 'GET') {
    const date = parsedUrl.query.date;
    const filtered = bookings.filter(b => b.date === date);
    res.writeHead(200);
    res.end(JSON.stringify(filtered));
  }

  // 3. POST /bookings
  else if (path === '/bookings' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const newBooking = {
        id: bookings.length + 1,
        room_id: data.room_id,
        booker_id: data.booker_id,
        date: data.date
      };
      bookings.push(newBooking);
      res.writeHead(201);
      res.end(JSON.stringify(newBooking));
    });
  }

  // 4. DELETE /bookings/:id
  else if (path.startsWith('/bookings/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Varausta ei löytynyt" }));
    }
  }

  // 5. GET /my-bookings/:booker_id
  else if (path.startsWith('/my-bookings/') && method === 'GET') {
    const id = parseInt(path.split('/')[2]);
    const userBookings = bookings.filter(b => b.booker_id === id);
    res.writeHead(200);
    res.end(JSON.stringify(userBookings));
  }

  // 6. POST /rooms
  else if (path === '/rooms' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const newRoom = {
        id: rooms.length + 1,
        name: data.name,
        capacity: data.capacity,
        description: data.description
      };
      rooms.push(newRoom);
      res.writeHead(201);
      res.end(JSON.stringify(newRoom));
    });
  }

  // 7. DELETE /rooms/:id
  else if (path.startsWith('/rooms/') && method === 'DELETE') {
    const id = parseInt(path.split('/')[2]);
    const index = rooms.findIndex(r => r.id === id);
    if (index !== -1) {
      rooms.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Huonetta ei löytynyt" }));
    }
  }

  // 404 - Tuntematon reitti
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Reittiä ei löytynyt" }));
  }
});

// Käynnistetään palvelin
server.listen(3001, () => {
  console.log("Node API toimii osoitteessa http://localhost:3001");
});
