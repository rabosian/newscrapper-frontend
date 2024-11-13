import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.style.css';

const Navbar = ({ user }) => {
  return (
    <div className="navbar__container">
      <Link to="/">
        <img src="/assets/images/TempLogo.webp" width={200}></img>
      </Link>

      {user ? (
        <>
          <Link to="/myfavorite">Favorites</Link>
          <div>
            <span style={{ cursor: 'pointer' }}>Logout</span>
          </div>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
