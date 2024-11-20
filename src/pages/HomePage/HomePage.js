import React from 'react';
import './home.style.css';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import ArticleGrid from '../../components/article/ArticleGrid';
import { useSelector } from 'react-redux';
import { categoryList } from '../../utils/categoryList';

function HomePage() {
  return (
    <main className="home">
      <HomeAside categoryList={categoryList} />
      <div className="wrapper">
        <ArticleGrid />
      </div>
    </main>
  );
}

function HomeAside({ categoryList }) {
  const { user } = useSelector((store) => store.user);

  const [query] = useSearchParams();

  let category = query.get('category') || 'business';
  if (!categoryList.includes(category)) category = 'business';

  return (
    <aside className="home__aside">
      <div className="home__top-height"></div>
      <div className="home__aside-sticky">
        <div className="home__aside-box">
          {user && (
            <div className="home__aside-profile">
              <div className="image-container">
                <img
                  src={
                    user.picture ||
                    'https://cdn-icons-png.flaticon.com/512/9385/9385289.png'
                  }
                  alt="profile pic"
                />
              </div>
              <div className="home__aside-name">{user.name}</div>
              <div className="home__aside-name">{user.email}</div>
            </div>
          )}
          {user && <div className="line"></div>}
          <div className="home__aside-category">
            <h3>Category</h3>
            <div className="home__aside-content">
              {categoryList.map((item) => (
                <Link
                  className={`home__aside-item ${
                    category === item && 'home__aside-item--active'
                  }`}
                  to={`/?category=${item}`}
                  key={item}
                >
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
