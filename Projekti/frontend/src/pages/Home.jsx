import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

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

    fetch('http://localhost:3001/all-bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  // Päivitä näkymän päivämäärät: kuluvan päivän ja loppuviikon (ma–pe)
  const getWeekDays = (weekOffset = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7);

    // Get Monday of the current week
    const currentDay = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const mondayOffset = (currentDay === 0 ? -6 : 1 - currentDay); // shift Sunday to previous Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const weekdays = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekdays.push(date);
    }

    return weekdays;
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

  const days = getWeekDays(weekOffset);

  return (
    <div className="container">
      <h2>Varaustilanne ({formatDayName(days[0])} – {formatDayName(days[days.length - 1])})</h2>

      <button onClick={() => navigate('/booking')}>Tee varaus</button>
      <table>
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

      <div className='pagination'>
        <button onClick={() => setWeekOffset(weekOffset - 1)}>« Edellinen viikko</button>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>
          Seuraava viikko »
        </button>
      </div>
    </div>
  );
}

export default Home;
