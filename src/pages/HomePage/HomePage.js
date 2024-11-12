import React from 'react';
import './home.style.css';
import { data } from './mockObj';
import { Link } from 'react-router-dom';
import { dateFormatter } from '../../utils/dateFormatter';

function HomePage() {
  // temp data
  if (data.loading) return 'loading...';

  return (
    <main className="home">
      <HomeAside categories={data.categories} />
      <div className="wrapper">
        <HomeLanding articles={data.articles} />
      </div>
    </main>
  );
}

function HomeAside({ categories }) {
  return (
    <aside className="home__aside">
      <div className="home__top-height"></div>
      <div className="home__aside-sticky">
        <div className="home__aside-box">
          <div className="home__aside-profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M19.001 15.5v1.5" />
              <path d="M19.001 21v1.5" />
              <path d="M22.032 17.25l-1.299 .75" />
              <path d="M17.27 20l-1.3 .75" />
              <path d="M15.97 17.25l1.3 .75" />
              <path d="M20.733 20l1.3 .75" />
            </svg>
            <div className="image-container">
              <img
                src="https://i.mydramalist.com/66L5p_5c.jpg"
                alt="profile pic"
              />
            </div>
            <div className="home__aside-name">Roseanne Park</div>
          </div>
          <div className="home__aside-category">
            <h3>Category</h3>
            <div className="home__aside-content">
              {categories.map((item) => (
                <Link className="home__aside-item" to={'/'}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function HomeLanding({ articles }) {
  return (
    <article className="home__landing">
      <div className="home__top-height">
        <h1>Today Headlines</h1>
      </div>
      <div className="home__landing-grid">
        {articles
          .filter(({ title }) => title !== '[Removed]')
          .map((item) => {
            return <HomeCard {...item} key={item.url} />;
          })}
      </div>
    </article>
  );
}

function HomeCard({ url, title, description, urlToImage, publishedAt }) {
  const published = dateFormatter(publishedAt);
  // when an article is deleted from news api,
  // title gets value with [Removed]

  return (
    <section className="home__landing-card">
      <div className="image-container">
        <Link to={url}>
          {urlToImage ? (
            <img src={urlToImage} alt={title} />
          ) : (
            <div className="no-image"></div>
          )}
        </Link>
      </div>
      <div className="home__landing-content">
        <Link to={url}>
          <div className="home__landing-text">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </Link>
        <div className="home__landing-details">
          <div className="home__landing-date">{published}</div>
          <div className="home__landing-stats">
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
      </div>
    </section>
  );
}

export default HomePage;
