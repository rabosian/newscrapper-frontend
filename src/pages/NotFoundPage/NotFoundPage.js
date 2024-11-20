import React from 'react';
import './NotFoundPage.style.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__description">Page Not Found</p>
        <a href="/" className="not-found__link">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
