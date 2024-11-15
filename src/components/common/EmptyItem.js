import React from 'react';
import './styles/emptyitem.style.css';

function EmptyItem() {
  return (
    <div className="empty">
      <div className="empty__content">
        <h1>No News Yet</h1>
        <p>
          It seems we don't have any updates right now. Check back soon for more
          news!
        </p>
      </div>
      <div className="image-container">
        <img src={'/assets/images/cloud-computing.png'} alt="leaf" />
      </div>
    </div>
  );
}

export default EmptyItem;
