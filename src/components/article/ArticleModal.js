import React from 'react';
import ArticleDetail from './ArticleDetail';
import { useSelector } from 'react-redux';

function ArticleModal() {
  const selectedArticle = useSelector((store) => store.article.selectedArticle);

  if (!selectedArticle) return null;
  return <ArticleDetail article={selectedArticle} />;
}

export default ArticleModal;
