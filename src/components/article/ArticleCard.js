import React, { useEffect, useState } from 'react';
import './styles/articleCard.style.css';
import { dateFormatter } from '../../utils/dateFormatter';
import ViewIcon from '../../assets/icons/ViewIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import ShareIcon from '../../assets/icons/ShareIcon';
import LikeIcon from '../../assets/icons/LikeIcon';
import { useSelector } from 'react-redux';
import StarIcon from '../../assets/icons/StarIcon';
import HeartIcon from '../../assets/icons/HeartIcon';

function ArticleCard({ item, handleOpen, handleFavorite }) {
  const [published, setPublished] = useState(null);

  const favoriteList = useSelector((state) => state.favorite.articleList);
  const isFavorite = favoriteList.find((favorite) => favorite._id === item._id);

  useEffect(() => {
    if (item) {
      const temp = dateFormatter(item.publishedAt);
      setPublished(temp);
    }
  }, [item]);

  function handleStar(e) {
    // to prevent bubbling
    e.stopPropagation();

    handleFavorite({ isFavorite, articleId: item });
  }

  return (
    <section className="article__card">
      <div className="image-container" onClick={() => handleOpen(item)}>
        {item.urlToImage ? (
          <img src={item.urlToImage} alt={item.title} />
        ) : (
          <div className="no-image"></div>
        )}
        <button onClick={handleStar} className="article__detail-fav">
          <HeartIcon isActive={isFavorite} />
        </button>
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
            handleFavorite={handleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </section>
  );
}

function CardStats({ item, handleOpen, handleFavorite, isFavorite }) {
  return (
    <div className="article__card-stats">
      <button onClick={() => handleOpen(item)}>
        <ViewIcon />
        {item.views || 0}
      </button>
      <button onClick={() => handleOpen(item)}>
        <CommentIcon />
        {item.totalCommentCount || 0}
      </button>
      {/* <button onClick={() => handleOpen(item)}>
        <ShareIcon />
        {item.shares?.length || 0}
      </button> */}
    </div>
  );
}

export default ArticleCard;
