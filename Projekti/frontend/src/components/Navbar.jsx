import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <nav>
      <Link to="/" className='nav-link'>Etusivu</Link>
      <Link to="/booking" className='nav-link'>Tee varaus</Link>
      <Link to="/my-bookings" className='nav-link'>Omat varaukset</Link>
      <Link to="/admin" className='nav-link'>Admin</Link>
    </nav>
  );
}

export default Navbar;
