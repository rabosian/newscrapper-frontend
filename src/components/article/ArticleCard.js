import React, { useEffect, useRef, useState } from 'react';
import './styles/articleCard.style.css';
import { dateFormatter } from '../../utils/dateFormatter';
import ViewIcon from '../../assets/icons/ViewIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import { useDispatch, useSelector } from 'react-redux';
import HeartIcon from '../../assets/icons/HeartIcon';
import { getArticlesByCategory } from '../../features/article/articleSlice';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useNavigate } from 'react-router-dom';

function ArticleCard({
  item,
  handleOpen,
  handleFavorite,
  isLast,
  totalPageNum,
  page,
  category,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastIdxRef = useRef(null);
  const [published, setPublished] = useState(null);
  const isVisible = useInfiniteScroll(lastIdxRef, { threshold: 1.0 });
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (isLast && isVisible && totalPageNum >= page) {
      dispatch(getArticlesByCategory({ page: page + 1, category }));
    }
  }, [isVisible]);

  const favoriteList = useSelector((state) => state.favorite.articleList);
  const isFavorite = favoriteList.find((favorite) => favorite._id === item._id);

  useEffect(() => {
    if (item) {
      const temp = dateFormatter(item.publishedAt);
      setPublished(temp);
    }
  }, [item]);

  function handleFavoriteClick(e) {
    // to prevent bubbling
    e.stopPropagation();

    if (!user) {
      navigate('/login');
    }

    handleFavorite({ isFavorite, articleId: item });
  }

  return (
    <section className="article__card" ref={lastIdxRef}>
      <div className="image-container" onClick={() => handleOpen(item)}>
        {/* check if current article doesnt carry a front image */}
        {item.urlToImage ? (
          <img src={item.urlToImage} alt={item.title} />
        ) : (
          <div className="no-image"></div>
        )}
        <button onClick={handleFavoriteClick} className="article__detail-fav">
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
        <ViewIcon />
        {item.views || 0}
      </button>
      <button onClick={() => handleOpen(item)}>
        <CommentIcon />
        {item.totalCommentCount || 0}
      </button>
    </div>
  );
}

export default ArticleCard;
