import React from 'react';
import { Link } from 'react-router-dom';
import './footer.style.css';

const Footer = () => {
  return (
    <div className="footer__container">
      <div>
        <h1>© 2024 Lowdown</h1>
      </div>
      <Link to="/">Contact Us</Link>
      <Link to="https://www.lipsum.com/">Privacy Policy</Link>

      <div className="footer__social-buttons">
        <a target="_blank" href="www.facebook.com">
          <img src="/assets/images/facebook.png" width={40}></img>
        </a>
        <a target="_blank" href="www.instagram.com">
          <img src="/assets/images/instagram.png" width={40}></img>
        </a>
        <a target="_blank" href="www.youtube.com">
          <img src="/assets/images/youtube.png" width={40}></img>
        </a>
      </div>
    </div>
  );
};

export default Footer;
