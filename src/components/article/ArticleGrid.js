import React, { useEffect, useState } from 'react';
import './styles/articleGrid.style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticlesByCategory,
  setSelectedArticle,
  // setSelectedCategory,
  updateArticleViews,
} from '../../features/article/articleSlice';
import {
  addFavoriteArticle,
  getFavoriteArticles,
} from '../../features/favorite/favoriteSlice';
import ArticleCard from './ArticleCard';
import EmptyItem from '../common/EmptyItem';
import { useSearchParams } from 'react-router-dom';
import { categoryList } from '../../utils/categoryList';

function ArticleGrid() {
  const dispatch = useDispatch();
  const { articleList, selectedCategory } = useSelector(
    (state) => state.article
  );
  const favoriteList = useSelector((state) => state.favorite.articleList);
  const [query] = useSearchParams();

  let category = query.get('category') || 'business';
  if (!categoryList.includes(category)) category = 'business';

  useEffect(() => {
    dispatch(getArticlesByCategory({ category }));
    // dispatch(setSelectedCategory(category));
  }, [query]);

  useEffect(() => {
    dispatch(getFavoriteArticles());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  async function handleOpen(item) {
    dispatch(updateArticleViews(item._id));
    dispatch(setSelectedArticle({ ...item, views: item.views + 1 }));
  }

  function handleClick(articleId) {
    dispatch(addFavoriteArticle({ articleId: articleId._id }));
  }

  if (articleList.length === 0)
    return (
      <EmptyItem
        title={'No News Yet'}
        content={
          "It seems we don't have any updates right now. Check back soon for more news!"
        }
      />
    );

  return (
    <article className="article">
      <header className="article__header">
        <h1>
          <span>{category}</span> Today
        </h1>
      </header>
      <div className="article__content">
        {articleList
          .filter(({ title }) => title !== '[Removed]')
          .map((item) => {
            return (
              <ArticleCard
                item={item}
                key={item.url}
                handleOpen={handleOpen}
                handleClick={handleClick}
                isFavorite={favoriteList.find(
                  (favorite) => favorite._id === item._id
                )}
              />
            );
          })}
      </div>
    </article>
  );
}

export default ArticleGrid;
