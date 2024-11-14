import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithToken, logout } from '../../features/user/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // 세션스토리지에 토큰이 있을 때만 실행
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(loginWithToken());
    }
  }, [dispatch]);

  function handleLogout() {
    dispatch(logout({ navigate }));
  }

  function handleLogin() {
    navigate('/login', { state: { from: location } });
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <div className="image-container">
          <img src="/assets/images/lowdown-logo.png" alt="logo-image" />
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
