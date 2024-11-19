import React, { useEffect, useState } from 'react';
import './styles/articleGrid.style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticles,
  getArticlesByCategory,
  setSelectedArticle,
} from '../../features/article/articleSlice';
import ArticleCard from './ArticleCard';
import EmptyItem from '../common/EmptyItem';
import { useSearchParams } from 'react-router-dom';
import { categoryList } from '../../utils/categoryList';

function ArticleGrid() {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.article.articleList);
  const [query] = useSearchParams();

  let category = query.get('category') || 'business';
  if (!categoryList.includes(category)) category = 'business';

  useEffect(() => {
    dispatch(getArticlesByCategory({ category }));
  }, [query]);

  function handleOpen(item) {
    dispatch(setSelectedArticle(item));
  }

  if (articleList.length === 0) return <EmptyItem />;

  return (
    <article className="article">
      <header className="article__header">
        {/* store -> 카테고리에서 이름 가져오기 */}
        <h1>
          <span>{category}</span> Today
        </h1>
      </header>
      <div className="article__content">
        {/* MAP -> GRID */}
        {articleList
          .filter(({ title }) => title !== '[Removed]')
          .map((item) => {
            return (
              <ArticleCard item={item} key={item.url} handleOpen={handleOpen} />
            );
          })}
      </div>
    </article>
  );
}

export default ArticleGrid;
