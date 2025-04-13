import React, { useEffect, useState } from 'react';

function Admin() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const fetchRooms = () => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = (e) => {
    e.preventDefault();

    if (!name || !capacity) {
      setMessage('Nimi ja kapasiteetti ovat pakollisia.');
      return;
    }

    fetch('http://localhost:3001/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        capacity: parseInt(capacity),
        description
      })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setMessage('Huone lisätty.');
        setName('');
        setCapacity('');
        setDescription('');
        fetchRooms();
      })
      .catch(() => setMessage('Virhe huoneen lisäyksessä.'));
  };

  const handleDeleteRoom = (id) => {
    if (!window.confirm('Poistetaanko huone?')) return;

    fetch(`http://localhost:3001/rooms/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 204) {
          fetchRooms();
        } else {
          throw new Error();
        }
      })
      .catch(() => alert('Virhe huoneen poistossa.'));
  };

  return (
    <div>
      <h2>Admin-paneeli</h2>

      <h3>Lisää uusi huone</h3>
      <form onSubmit={handleAddRoom} style={{ maxWidth: '400px' }}>
        <label>
          Nimi:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label><br />
        <label>
          Kapasiteetti:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </label><br />
        <label>
          Kuvaus:
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label><br /><br />
        <button type="submit">Lisää huone</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}

      <h3>Olemassa olevat huoneet</h3>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name} ({room.capacity} hlö) – {room.description}
            {' '}
            <button onClick={() => handleDeleteRoom(room.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
