import React, { useEffect, useState } from 'react';
import './styles/articleGrid.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../features/article/articleSlice';
import ArticleCard from './ArticleCard';
import EmptyItem from '../common/EmptyItem';
import ArticleDetail from './ArticleDetail';

function ArticleGrid() {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.article.articleList);
  const [article, setArticle] = useState(null);

  // 나중에 redux로 구현할지 여부 정하기
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  function handleOpen(item) {
    setModalOn((prev) => !prev);
    setArticle(item);
  }

  if (articleList.length === 0) return <EmptyItem />;

  return (
    <article className="article">
      <header className="article__header">
        {/* store -> 카테고리에서 이름 가져오기 */}
        <h1>Today Headlines</h1>
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
      {modalOn && (
        <ArticleDetail
          handleOpen={handleOpen}
          article={article}
          modalOn={modalOn}
        />
      )}
    </article>
  );
}

export default ArticleGrid;
