import React from 'react';
import './home.style.css';
import { data } from './mockObj';
import { Link } from 'react-router-dom';
import ArticleGrid from '../../components/article/ArticleGrid';
import { useSelector } from 'react-redux';

function HomePage() {
  return (
    <main className="home">
      <HomeAside categories={data.categories} />
      <div className="wrapper">
        <ArticleGrid />
      </div>
    </main>
  );
}

function HomeAside({ categories }) {
  const { user } = useSelector((store) => store.user);

  return (
    <aside className="home__aside">
      <div className="home__top-height"></div>
      <div className="home__aside-sticky">
        <div className="home__aside-box">
          {user && (
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
                  src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                  alt="profile pic"
                />
              </div>
              <div className="home__aside-name">{user.name}</div>
              <div className="home__aside-name">{user.email}</div>
            </div>
          )}
          <div className="home__aside-category">
            <h3>Category</h3>
            <div className="home__aside-content">
              {categories.map((item) => (
                <Link className="home__aside-item" to={'/'} key={item}>
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

export default HomePage;
