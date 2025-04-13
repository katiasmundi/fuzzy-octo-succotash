import React, { useEffect, useState } from 'react';

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Virhe haettaessa huoneita:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Varmistetaan että kaikki kentät on täytetty
    if (!selectedRoom || !date) {
      setMessage('Valitse huone ja päivämäärä.');
      return;
    }

    const booking = {
      room_id: parseInt(selectedRoom),
      booker_id: 1, // Testikäyttäjä. Voidaan myöhemmin kysyä oikeasti.
      date: date
    };

    fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Varauksen luonti epäonnistui');
      })
      .then(data => {
        setMessage(`Varaus onnistui! (id ${data.id})`);
        setDate('');
        setSelectedRoom('');
      })
      .catch(err => {
        console.error(err);
        setMessage('Varauksessa tapahtui virhe.');
      });
  };

  return (
    <div>
      <h2>Tee varaus</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>
          Päivämäärä:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br /><br />

        <label>
          Valitse huone:
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            required
          >
            <option value="">-- Valitse huone --</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} ({room.capacity} hlö) – {room.description}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <button type="submit">Varaa</button>
      </form>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default Booking;
