import React, { useEffect, useState } from 'react';
import './styles/articleCard.style.css';
import { dateFormatter } from '../../utils/dateFormatter';

function ArticleCard({ item, handleOpen }) {
  const [published, setPublished] = useState(null);

  useEffect(() => {
    if (item) {
      const temp = dateFormatter(item.publishedAt);
      setPublished(temp);
    }
  }, [item]);

  return (
    <section className="article__card">
      <div className="image-container" onClick={() => handleOpen(item)}>
        {item.urlToImage ? (
          <img src={item.urlToImage} alt={item.title} />
        ) : (
          <div className="no-image"></div>
        )}
      </div>
      <div className="article__card-content">
        <div className="article__card-text" onClick={() => handleOpen(item)}>
          <h2>{item.title}</h2>
          <p>{item.source.name}</p>
        </div>
        <div className="article__card-details">
          <div className="article__card-date">{published}</div>
          <CardStats item={item} handleOpen={handleOpen} />
        </div>
      </div>
    </section>
  );
}

function CardStats({ item, handleOpen }) {
  return (
    <div className="article__card-stats">
      <button onClick={() => handleOpen(item)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
        </svg>
        {Math.floor(Math.random() * 1000) + 100}
      </button>
      <button onClick={() => handleOpen(item)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 11v.01" />
          <path d="M8 11v.01" />
          <path d="M16 11v.01" />
          <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
        </svg>
        {Math.floor(Math.random() * 100)}
      </button>
      <button onClick={() => handleOpen(item)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" />
        </svg>
        {Math.floor(Math.random() * 20)}
      </button>
    </div>
  );
}

export default ArticleCard;
