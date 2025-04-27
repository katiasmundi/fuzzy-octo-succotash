import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [bookers, setBookers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [bookerIdInput, setBookerIdInput] = useState(''); //varauksen voi tehdä toisen puolesta


  useEffect(() => {
    // Hae huoneet
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Virhe haettaessa huoneita:', err));

    // Hae varaajat
    fetch('http://localhost:3001/bookers')
      .then(res => res.json())
      .then(data => setBookers(data))
      .catch(err => console.error('Virhe haettaessa varaajia:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Varmistetaan että kaikki kentät on täytetty
    if (!selectedRoom || !date) {
      setMessage('Valitse huone ja päivämäärä.');
      return;
    }

    const bookerId = bookerIdInput ? parseInt(bookerIdInput) : 1;

    const booking = {
      room_id: parseInt(selectedRoom),
      booker_id: bookerId,
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
        const bookerId = bookerIdInput ? parseInt(bookerIdInput) : 1;
        const booker = bookers.find(b => b.id === bookerId);
        const bookerName = booker ? booker.name : `Käyttäjä ${bookerId}`;
        setMessage(`Varaus onnistui! ${roomName} varattu ${bookerName}lle päivälle ${date}`);
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
    <div className="container">
      <h2>Tee varaus</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Varaaja:
          <select
            value={bookerIdInput}
            onChange={(e) => setBookerIdInput(e.target.value)}
            required
          >
            <option value="">-- Valitse varaaja --</option>
            {bookers.map(booker => (
              <option key={booker.id} value={booker.id}>
                {booker.name}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <label>
          Päivämäärä:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onFocus={(e) => e.target.showPicker?.()} // Avaa kalenterin koko painikkeesta
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

      {message && <p>{message}</p>}

      <br /><br />
      <button
        type="button"
        onClick={() => navigate('/my-bookings')}
      >
        Näytä omat varaukset
      </button>
    </div>
  );
}



export default Booking;