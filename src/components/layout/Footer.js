import React from 'react';
import { Link } from 'react-router-dom';
import './footer.style.css';
import FacebookIcon from '../../assets/icons/FacebookIcon';
import InstagramIcon from '../../assets/icons/InstagramIcon';
import YoutubeIcon from '../../assets/icons/YoutubeIcon';
import TwitterIcon from '../../assets/icons/TwitterIcon';

const label = [
  {
    label: 'facebook',
    to: 'http://www.facebook.com',
    src: <FacebookIcon />,
  },
  {
    label: 'instagram',
    to: 'http://www.instagram.com',
    src: <InstagramIcon />,
  },
  {
    label: 'youtube',
    to: 'http://www.youtube.com',
    src: <YoutubeIcon />,
  },
  {
    label: 'twitter',
    to: 'http://www.twitter.com',
    src: <TwitterIcon />,
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__content">
          <div className="image-container logo">
            <img src="/assets/images/lowdown-logo.png" alt="lowdown logo" />
          </div>
          <div className="line"></div>
          <div className="footer__text">
            <div className="footer__link">
              <Link to="/">Contact Us</Link>
              <Link to="/">About Us</Link>
              <Link to="https://www.lipsum.com/">Privacy Policy</Link>
              <Link to="/">Cookie Policy</Link>
              <Link to="/">Terms of Use</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">How We Review Products</Link>
            </div>
            <ul className="footer__social">
              {label.map(({ label, to, src }) => (
                <li key={label}>
                  <Link to={to} target="_blank">
                    {src}
                  </Link>
                </li>
              ))}
            </ul>
            <p>© 2024 LOWDOWN, ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
