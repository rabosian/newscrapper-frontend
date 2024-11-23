import React, { useEffect } from 'react';
import './home.style.css';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import ArticleGrid from '../../components/article/ArticleGrid';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../utils/categoryList';
import {
  clearArticle,
  getArticlesByCategory,
} from '../../features/article/articleSlice';
import { getFavoriteArticles } from '../../features/favorite/favoriteSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function HomePage() {
  const dispatch = useDispatch();

  const [query] = useSearchParams();
  let category = query.get('category') || 'business';
  if (!categoryList.includes(category)) category = 'business';

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, []);

  useEffect(() => {
    dispatch(getArticlesByCategory({ page: 1, category }));

    return () => {
      window.scrollTo(0, 0);
      dispatch(clearArticle());
    };
  }, [query]);

  const { articleList, totalPageNum, page, loading } = useSelector(
    (state) => state.article
  );

  return (
    <>
      <main className="home">
        <HomeAside categoryList={categoryList} />
        <div className="wrapper">
          <ArticleGrid
            category={category}
            articleList={articleList}
            totalPageNum={totalPageNum}
            page={page}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
}

function HomeAside({ categoryList }) {
  const { user } = useSelector((store) => store.user);

  const [query] = useSearchParams();

  let category = query.get('category') || 'business';
  if (!categoryList.includes(category)) category = 'business';

  return (
    <aside className="home__aside">
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
