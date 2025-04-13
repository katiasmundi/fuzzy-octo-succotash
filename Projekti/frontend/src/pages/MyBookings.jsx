import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const bookerId = 1; // ← Kovakoodattu käyttäjä (myöhemmin dynaaminen)

  useEffect(() => {
    fetch(`http://localhost:3001/my-bookings/${bookerId}`)
      .then(res => {
        if (!res.ok) throw new Error('Virhe varauksien haussa');
        return res.json();
      })
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Varauksien haku epäonnistui');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Omat varaukset</h2>

      {loading && <p>Ladataan varauksia...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bookings.length === 0 && !loading && <p>Ei varauksia.</p>}

      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Huone {booking.room_id}, päivämäärä {booking.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
