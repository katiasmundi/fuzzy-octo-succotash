import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const bookerId = 1; // Testikäyttäjä
  const navigate = useNavigate();

  // Hae varaukset
  const fetchBookings = () => {
    setLoading(true);
    fetch(`http://localhost:3001/my-bookings/${bookerId}`)
      .then(res => {
        if (!res.ok) throw new Error('Virhe varauksien haussa');
        return res.json();
      })
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(sorted);
        setLoading(false);
      })

      .catch(err => {
        console.error(err);
        setError('Varauksien haku epäonnistui');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Poista varaus
  const cancelBooking = (id) => {
    if (!window.confirm('Haluatko varmasti peruuttaa varauksen?')) return;

    fetch(`http://localhost:3001/bookings/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.status === 204) {
          fetchBookings(); // Päivitä varaukset
        } else {
          throw new Error('Peruutus epäonnistui');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Virhe varauksen peruutuksessa.');
      });
  };

  return (
    <div className='container'>
      <h2>Omat varaukset</h2>

      {loading && <p>Ladataan varauksia...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && bookings.length === 0 && <p>Ei varauksia.</p>}

      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Huone {booking.room_name}, päivämäärä {booking.date}{' '}
            <button onClick={() => cancelBooking(booking.id)}>Peruuta</button>
            {' '}
            <button onClick={() => navigate(`/admin/edit-booking/${booking.id}`, { state: { from: 'my-bookings' } })}>
              Muokkaa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;
