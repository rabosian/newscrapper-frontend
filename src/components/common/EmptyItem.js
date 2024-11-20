import React from 'react';
import './styles/emptyitem.style.css';

function EmptyItem({ title, content }) {
  return (
    <div className="empty">
      <div className="empty__content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <div className="image-container">
        <img src={'/assets/images/cloud-computing.png'} alt="leaf" />
      </div>
    </div>
  );
}

export default EmptyItem;
