import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBooking() {
  const { id } = useParams(); // URL:sta varauksen id
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Haetaan varauksen tiedot
    fetch('http://localhost:3001/all-bookings')
    .then(res => res.json())
    .then(data => {
      const found = data.find(b => b.id === parseInt(id));
      if (found) {
        setBooking({ room_id: found.room_id, date: found.date });
      }
    })
      .catch(err => console.error('Virhe varauksen haussa:', err));

    // Haetaan huoneet valikkoa varten
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Virhe huoneiden haussa:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_id: booking.room_id,
        date: booking.date
      })
    })
      .then(res => {
        if (res.ok) {
            navigate('/admin', { state: { message: 'Varaus päivitetty onnistuneesti!' } });
        } else {
            return res.text().then(text => { throw new Error(text); });
        }
    })
    .catch(err => {
      console.error('Muokkausvirhe:', err.message);
      alert('Muokkaus epäonnistui:\n' + err.message);
      });
  };

  if (!booking || rooms.length === 0) {
    return <div>Ladataan...</div>;
  }

  return (
    <div className="edit-booking">
      <h2>Muokkaa varausta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Huone:
          <select
            value={booking.room_id}
            onChange={(e) => setBooking({ ...booking, room_id: parseInt(e.target.value) })}
          >
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <label>
          Päivämäärä:
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
          />
        </label>

        <br /><br />

        <button type="submit">Tallenna muutokset</button>
      </form>
    </div>
  );
}

export default EditBooking;
