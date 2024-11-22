import React from 'react';
import './styles/loadingComment.style.css';

function LoadingComment() {
  return (
    <d className="loading__comment">
      <div className="loading__comment-box">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loading__bg"></div>
    </d>
  );
}

export default LoadingComment;
