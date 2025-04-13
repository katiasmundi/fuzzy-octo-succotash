import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const linkStyle = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold'
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={linkStyle}>Etusivu</Link>
      <Link to="/booking" style={linkStyle}>Tee varaus</Link>
      <Link to="/my-bookings" style={linkStyle}>Omat varaukset</Link>
      <Link to="/admin" style={linkStyle}>Admin</Link>
    </nav>
  );
}

export default Navbar;
