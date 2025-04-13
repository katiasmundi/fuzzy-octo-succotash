import React, { useEffect, useState } from 'react';

function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Virhe huoneiden hakemisessa:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Etusivu – Neuvotteluhuoneet</h1>

      {loading && <p>Ladataan huoneita...</p>}

      {!loading && rooms.length === 0 && <p>Ei huoneita löytynyt.</p>}

      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <strong>{room.name}</strong> ({room.capacity} hlö) – {room.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
