import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavoriteArticle,
  getFavoriteArticles,
  setSelectedArticle,
} from '../../features/favorite/favoriteSlice.js';
import ArticleCard from '../../components/article/ArticleCard.js';
import EmptyItem from '../../components/common/EmptyItem.js';
import '../../components/article/styles/articleGrid.style.css';
import '../HomePage/home.style.css';

function FavoritePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, []);

  const favoriteList = useSelector((state) => state.favorite.articleList);

  function handleOpen(item) {
    dispatch(setSelectedArticle(item));
  }

  function handleClick(item) {
    dispatch(deleteFavoriteArticle({ articleId: item._id }));
  }

  if (favoriteList.length === 0)
    return (
      <EmptyItem title={'No Favorites Yet'} content={'Add your favorites!'} />
    );

  return (
    <main className="home">
      <div className="wrapper">
        <article className="article">
          <header className="article__header">
            <h1>My Favorites</h1>
          </header>
          <div className="article__content">
            {/* MAP -> GRID */}
            {favoriteList.map((item) => {
              return (
                <ArticleCard
                  item={item}
                  key={item.url}
                  handleOpen={handleOpen}
                  handleClick={handleClick}
                  isFavorite={true}
                />
              );
            })}
          </div>
        </article>
      </div>
    </main>
  );
}

export default FavoritePage;
