import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
        if (res.status === 409) {
          throw new Error('duplicate');
        }
        if (!res.ok) {
          throw new Error('general');
        }
        return res.json();
      })
      .then(data => {
        const selectedRoomObj = rooms.find(room => room.id === parseInt(selectedRoom));
        const roomName = selectedRoomObj ? selectedRoomObj.name : `ID ${selectedRoom}`;
        setMessage(`Varaus onnistui! ${roomName} varattu päivälle ${date}`);
        setDate('');
        setSelectedRoom('');
      })
      .catch(err => {
        console.error(err);
        if (err.message === 'duplicate') {
          setMessage('Valittu huone on jo varattu kyseiselle päivälle.');
        } else {
          setMessage('Varauksessa tapahtui virhe.');
        }
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

      <button
  type="button"
  onClick={() => navigate('/my-bookings')}
  style={{ marginTop: '1rem' }}
>
  Näytä omat varaukset
</button>
    </div>
  );
}



export default Booking;