import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArticleDetail from '../article/ArticleDetail';

function Modal() {
  const selectedArticle = useSelector((store) => store.article.selectedArticle);

  if (!selectedArticle) return null;
  return <ArticleDetail article={selectedArticle} />;
}

export default Modal;
