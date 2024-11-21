import React, { useEffect, useRef, useState } from 'react';
import './styles/articleDetail.style.css';
import { dateFormatter } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClearSelectedArticle } from '../../features/article/articleSlice';
import ArticleComment from './ArticleComment';
import { getComments } from '../../features/comment/commentSlice';
import ExitIcon from '../../assets/icons/ExitIcon';
import ViewIcon from '../../assets/icons/ViewIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import {
  addFavoriteArticle,
  deleteFavoriteArticle,
} from '../../features/favorite/favoriteSlice';
import HeartIcon from '../../assets/icons/HeartIcon';

const body = document.getElementsByTagName('body')[0];

function ArticleDetail({ article, isFavorite }) {
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [commentOn, setCommentOn] = useState(false);

  useEffect(() => {
    dispatch(getComments(article._id));
  }, []);

  useEffect(() => {
    if (article) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    // when comment box is opened automactically scroll to comment scrolled position
    if (commentOn) {
      commentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [commentOn]);

  function handleModalClose() {
    dispatch(setClearSelectedArticle());
  }

  function handleCommentClick() {
    setCommentOn((prev) => !prev);
  }

  function handleFavorite({ isFavorite }) {
    if (isFavorite) {
      dispatch(deleteFavoriteArticle({ articleId: article._id }));
    } else {
      dispatch(addFavoriteArticle({ articleId: article._id }));
    }
  }

  return (
    <>
      <section className="article__detail">
        <div
          className={`article__detail-content ${
            commentOn && 'article__detail-content--active'
          }`}
        >
          <div className="article__detail-group">
            <div className="article__detail-close" onClick={handleModalClose}>
              <ExitIcon />
            </div>
            <ArticleStats
              {...article}
              handleFavorite={handleFavorite}
              isFavorite={isFavorite}
            />
            <div
              className={`article__detail-comment ${
                commentOn && 'article__detail-comment--active'
              }`}
            >
              <button onClick={handleCommentClick}>Comment</button>
            </div>
          </div>
          {commentOn && (
            <ArticleComment articleId={article._id} commentRef={commentRef} />
          )}
        </div>
        <div className="back-cover" onClick={handleModalClose}></div>
      </section>
    </>
  );
}

function ArticleStats({
  url,
  title,
  source,
  summary,
  urlToImage,
  publishedAt,
  views,
  totalCommentCount,
  isFavorite,
  handleFavorite,
}) {
  const published = dateFormatter(publishedAt);

  return (
    <div className="article__detail-desc">
      {/* Image */}
      <div className="image-container">
        <img src={urlToImage} alt={title} />
        <button
          onClick={() => handleFavorite({ isFavorite })}
          className="article__detail-fav"
        >
          <HeartIcon isActive={isFavorite} />
        </button>
      </div>
      <ModalStats
        views={views}
        totalCommentCount={totalCommentCount}
        published={published}
      />
      {/* Information */}
      <div className="article__detail-info">
        {/* Text */}
        <header className="article__detail-header">
          <h3>{title}</h3>
          <div className="line"></div>
          <p>
            <span>About:</span>
            {summary}
          </p>
        </header>
        {/* Link */}
        <div className="article__detail-link">
          <span>Read article:</span>
          <Link to={url} target="__blank">
            Link
          </Link>
        </div>
        <div className="article__detail-source">
          <div className="article__detail-from">Source from {source.name}</div>
        </div>
      </div>
    </div>
  );
}

function ModalStats({ views, totalCommentCount, published }) {
  return (
    <div className="article__detail-details">
      <div className="article__detail-date">Posted {published}</div>
      <div className="article__detail-stats">
        <button>
          <ViewIcon />
          {views || 0}
        </button>
        <button>
          <CommentIcon />
          {totalCommentCount || 0}
        </button>
      </div>
    </div>
  );
}
export default ArticleDetail;
