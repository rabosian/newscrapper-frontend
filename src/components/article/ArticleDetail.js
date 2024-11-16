import React, { useEffect, useRef, useState } from 'react';
import './styles/articleDetail.style.css';
import { dateFormatter } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClearSelectedArticle } from '../../features/article/articleSlice';
import ArticleComment from './ArticleComment';

const body = document.getElementsByTagName('body')[0];

function ArticleDetail({ article }) {
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [commentOn, setCommentOn] = useState(false);

  // 임시 코멘트 -> redux에서 list로 값 가져올 것
  const [tempComments, setTempComments] = useState([]);

  useEffect(() => {
    if (article) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (commentOn) {
      commentRef.current.scrollIntoView({
        behavior: 'smooth', // 부드럽게 스크롤
        block: 'start', // 요소가 화면 상단에 오도록
      });
    }
  }, [commentOn]);

  // useEffect(() => {
  //   console.log(commentRef);
  // }, [commentRef.current]);

  function handleClose() {
    dispatch(setClearSelectedArticle());
  }

  function handleClickComment() {
    setCommentOn((prev) => !prev);
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
            <div className="article__detail-close" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
            <ArticleStats {...article} />
            <div
              className={`article__detail-comment ${
                commentOn && 'article__detail-comment--active'
              }`}
            >
              <button onClick={handleClickComment}>Comment</button>
            </div>
          </div>
          {commentOn && (
            <ArticleComment
              commentRef={commentRef}
              tempComments={tempComments}
              setTempComments={setTempComments}
            />
          )}
        </div>
        <div className="back-cover" onClick={handleClose}></div>
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
}) {
  const published = dateFormatter(publishedAt);
  return (
    <div className="article__detail-desc">
      {/* Image */}
      <div className="image-container">
        <img src={urlToImage} alt={title} />
      </div>
      <ModalStats published={published} />
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

function ModalStats({ published }) {
  return (
    <div className="article__detail-details">
      <div className="article__detail-date">Posted {published}</div>
      <div className="article__detail-stats">
        <button>
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
        <button>
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
        <button>
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
    </div>
  );
}
export default ArticleDetail;
