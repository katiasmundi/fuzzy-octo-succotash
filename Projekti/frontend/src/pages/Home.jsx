import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const navigate = useNavigate();

  // Hae huoneet ja kaikki varaukset
  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(res => res.json())
      .then(setRooms);

    fetch('http://localhost:3001/bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  // Päivitä näkymän päivämäärät: kuluvan päivän ja loppuviikon (ma–pe)
  const getWeekDays = () => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7);

    const currentDay = today.getDay(); // 0=su, 1=ma, ..., 6=la
    const remainingWeekdays = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      const dayOffset = i - (currentDay - 1);
      if (dayOffset >= 0) {
        date.setDate(today.getDate() + dayOffset);
        remainingWeekdays.push(date);
      }
    }

    return remainingWeekdays;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  const formatDayName = (date) => {
    return date.toLocaleDateString('fi-FI', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric'
    });
  };

  const isBooked = (roomId, dateStr) => {
    return bookings.some(b => b.room_id === roomId && b.date === dateStr);
  };

  const days = getWeekDays();

  return (
    <div>
      <h2>Varaustilanne ({formatDayName(days[0])} – {formatDayName(days[days.length - 1])})</h2>

      <button onClick={() => navigate('/booking')} style={{ marginBottom: '1rem' }}>
        Tee varaus
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Huone</th>
            {days.map(date => (
              <th key={date.toDateString()}>{formatDayName(date)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              {days.map(date => {
                const dateStr = formatDate(date);
                return (
                  <td key={dateStr}>
                    {isBooked(room.id, dateStr) ? '🔴 Varattu' : '🟢 Vapaa'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setWeekOffset(weekOffset - 1)}>« Edellinen viikko</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)} style={{ marginLeft: '1rem' }}>
          Seuraava viikko »
        </button>
      </div>
    </div>
  );
}

export default Home;
