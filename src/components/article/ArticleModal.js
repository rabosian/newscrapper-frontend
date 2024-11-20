import React from 'react';
import ArticleDetail from './ArticleDetail';
import { useSelector } from 'react-redux';

function ArticleModal() {
  const selectedArticle = useSelector((store) => store.article.selectedArticle);
  const favoriteList = useSelector((state) => state.favorite.articleList);
  if (!selectedArticle) return null;
  return (
    <ArticleDetail
      article={selectedArticle}
      isFavorite={favoriteList.find(
        (favorite) => favorite._id === selectedArticle._id
      )}
    />
  );
}

export default ArticleModal;
