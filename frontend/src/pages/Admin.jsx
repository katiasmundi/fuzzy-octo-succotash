import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom'; // Tarvitaan navigointiin
import { useLocation } from 'react-router-dom';

function Admin() {
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(location.state?.message || ''); // vastaanota ilmoitus
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate(); // Navigointiin reitille

  const fetchRooms = () => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data));
  };

  const fetchAllBookings = () => {
    fetch('http://localhost:3001/all-bookings')
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllBookings(sorted);
      })
      .catch(err => console.error('Virhe varauksien haussa:', err));
  };

  useEffect(() => {
    fetchRooms();
    fetchAllBookings();
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

  const handleDeleteBooking = (id) => {
    if (!window.confirm('Haluatko varmasti peruuttaa tämän varauksen?')) return;

    fetch(`http://localhost:3001/bookings/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 204) {
          // Poiston jälkeen haetaan varaukset uudelleen
          fetch('http://localhost:3001/all-bookings')
            .then(res => res.json())
            .then(data => setAllBookings(data));
        } else {
          throw new Error();
        }
      })
      .catch(() => alert('Varauksen poistaminen epäonnistui.'));
  };

  const handleEditBooking = (id) => {
    navigate(`/admin/edit-booking/${id}`);
  };

  return (
    <div className='container'>
      <h2>Admin-paneeli</h2>

      <h3>Lisää uusi huone</h3>
      <form onSubmit={handleAddRoom}>
        <label>
          Nimi:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label><br />
        <label>
          Kapasiteetti:
          <input
            type="number"
            value={capacity}
            min={1}
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

      {message && <p>{message}</p>}

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

      <h3>Kaikki varaukset</h3>
      <ul>
        {allBookings.map(booking => (
          <li key={booking.id}>
            {booking.room_name}, {booking.date} (varaaja: {booking.booker_name})
            {' '}
            <button onClick={() => handleDeleteBooking(booking.id)}>Poista</button>
            {' '}
            <button onClick={() => navigate(`/admin/edit-booking/${booking.id}`, { state: { from: 'admin' } })}>
              Muokkaa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
