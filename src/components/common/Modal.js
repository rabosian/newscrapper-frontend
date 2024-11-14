import React, { useEffect } from 'react';
import './styles/modal.style.css';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../utils/dateFormatter';

const body = document.getElementsByTagName('body')[0];

function Modal({ handleOpen, article, modalOn }) {
  useEffect(() => {
    if (modalOn) {
      body.style.overflow = 'hidden';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [modalOn]);
  return (
    <>
      <section className="modal">
        <div className="modal__content">
          <div className="modal__close" onClick={() => handleOpen(null)}>
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
          <ModalTop {...article} />
          {/* comments */}
          {/* <div className="modal__comments"></div> */}
        </div>
        <div className="back-cover" onClick={() => handleOpen(null)}></div>
      </section>
    </>
  );
}

function ModalTop({
  url,
  title,
  source,
  description,
  urlToImage,
  publishedAt,
}) {
  const published = dateFormatter(publishedAt);
  return (
    <div className="modal__desc">
      {/* Image */}
      <div className="image-container">
        <img src={urlToImage} alt={title} />
      </div>
      <ModalStats published={published} />
      {/* Information */}
      <div className="modal__desc-info">
        {/* Text */}
        <header className="modal__desc-header">
          <h3>{title}</h3>
          <div className="line"></div>
          <p>
            <span>About:</span>
            {description}
          </p>
        </header>
        {/* Link */}
        <div className="modal__desc-link">
          <span>Read article:</span>
          <Link to={url} target="__blank">
            Link
          </Link>
        </div>
        <div className="modal__desc-source">
          <div className="modal__desc-from">Source from {source.name}</div>
        </div>
      </div>
    </div>
  );
}

function ModalStats({ published }) {
  return (
    <div className="modal__desc-details">
      <div className="modal__desc-date">Posted {published}</div>
      <div className="modal__desc-stats">
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

export default Modal;
