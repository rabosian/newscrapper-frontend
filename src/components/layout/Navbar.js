import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.style.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {}

  function handleLogin() {
    navigate('/login', { state: { from: location } });
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <div className="image-container">
          <img src="/assets/images/lowdown-logo.png" />
        </div>
      </Link>

      <nav>
        <div className="navbar__content">
          {user ? (
            <>
              <button className="navbar__btn" onClick={handleLogout}>
                Log Out
              </button>
              <Link className="navbar__favorite" to="/myfavorite">
                My Page
              </Link>
            </>
          ) : (
            <>
              <button className="navbar__btn" onClick={handleLogin}>
                Log In
              </button>
              <Link className="navbar__register" to="/register">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
