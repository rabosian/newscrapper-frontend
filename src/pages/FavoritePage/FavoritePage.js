import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteArticles } from '../../features/favorite/favoriteSlice.js';
import EmptyItem from '../../components/common/EmptyItem.js';
import '../../components/article/styles/articleGrid.style.css';
import '../HomePage/home.style.css';
import ArticleGrid from '../../components/article/ArticleGrid.js';
import { clearArticle } from '../../features/article/articleSlice.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.js';

function FavoritePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteArticles());

    return () => {
      window.scrollTo(0, 0);
      dispatch(clearArticle());
    };
  }, []);

  const { articleList: favoriteList, loading } = useSelector(
    (state) => state.favorite
  );

  if (!loading && favoriteList.length === 0)
    return (
      <EmptyItem title={'No Favorites Yet'} content={'Add your favorites!'} />
    );

  return (
    <main className="home">
      {loading && <LoadingSpinner />}
      <div className="wrapper">
        <ArticleGrid category={'My Favorites'} articleList={favoriteList} />
      </div>
    </main>
  );
}

export default FavoritePage;
