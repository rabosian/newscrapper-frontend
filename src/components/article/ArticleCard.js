import React, { useEffect, useState } from 'react';
import './styles/articleCard.style.css';
import { dateFormatter } from '../../utils/dateFormatter';
import ViewIcon from '../../assets/icons/ViewIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import LikeIcon from '../../assets/icons/LikeIcon';

function ArticleCard({ item, handleOpen, handleClick }) {
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
          <CardStats
            item={item}
            handleOpen={handleOpen}
            handleClick={handleClick}
          />
        </div>
      </div>
    </section>
  );
}

function CardStats({ item, handleOpen, handleClick }) {
  return (
    <div className="article__card-stats">
      <button onClick={() => handleOpen(item)}>
        <ViewIcon />
        {item.views || 0}
      </button>
      <button onClick={() => handleOpen(item)}>
        <CommentIcon />
        {item.comments?.length || 0}
      </button>
      <button onClick={() => handleOpen(item)}>
        <ShareIcon />
        {item.shares?.length || 0}
      </button>
      <button onClick={() => handleClick(item)}>
        <LikeIcon />
      </button>
    </div>
  );
}

export default ArticleCard;
