import React, { useEffect } from 'react';
import ArticleDetail from './ArticleDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteArticles } from '../../features/favorite/favoriteSlice';

function ArticleModal() {
  const dispatch = useDispatch();
  const selectedArticle = useSelector((store) => store.article.selectedArticle);
  const favoriteList = useSelector((state) => state.favorite.articleList);

  useEffect(() => {
    if (selectedArticle) {
      dispatch(getFavoriteArticles());
    }
  }, [selectedArticle]);

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
