import React, { useEffect, useRef, useState } from 'react';
import './styles/articleComment.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../../utils/dateFormatter';
import { createComment } from '../../features/comment/commentSlice';
import LikeIcon from '../../assets/icons/LikeIcon';
import EditIcon from '../../assets/icons/EditIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon';

function ArticleComment({
  articleId,
  commentRef,
  // tempComments,
  // setTempComments,
}) {
  const user = useSelector((store) => store.user.user);
  const { loading, error, commentList } = useSelector(
    (store) => store.comments
  );

  return (
    <div className="comment" ref={commentRef}>
      {/* user */}
      <CommentUser articleId={articleId} user={user} />
      {/* others */}
      <div className="comment__list">
        {commentList.map((item) => (
          <CommentCard key={item._id} {...item} user={user} />
        ))}
      </div>
    </div>
  );
}

function CommentUser({ articleId, user, setTempComments }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const textRef = useRef();
  const [hasFocus, setHasFocus] = useState(false);

  function handleInput() {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { value } = textRef.current;

    if (!user) {
      setError('Login is required');
      return;
    }

    if (value.trim() === '') return;

    // 이 값을 서버에 보내면 될 듯
    // 유저 아이디 + 유저가 입력한 값
    const payload = { articleId, contents: value };
    dispatch(createComment(payload));

    handleReset();
  }

  function handleReset() {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  }

  /* Focus textarea to display buttons */
  function handleFocus() {
    setHasFocus(true);
  }
  useEffect(() => {
    if (hasFocus) {
      document.addEventListener('click', focusOnTarget);
    }
    if (!hasFocus) {
      document.removeEventListener('click', focusOnTarget);
    }
    return () => document.removeEventListener('click', focusOnTarget);
  }, [hasFocus]);
  function focusOnTarget(e) {
    if (
      !e?.target?.className.includes('comment__user-comment') &&
      !e?.target?.parentElement?.className.includes('comment__user-btns') &&
      !e?.target?.className.includes('comment__user-btns')
    ) {
      setHasFocus(false);
    }
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="comment__user">
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            alt="your profile pic"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          tabIndex={0}
          className="comment__user-form"
        >
          <textarea
            className="comment__user-comment"
            ref={textRef}
            placeholder="Add a comment..."
            name="comment"
            onInput={handleInput}
            rows={1}
            onClick={handleFocus}
          />
          {hasFocus && (
            <div className="comment__user-btns">
              <button type="button" onClick={handleReset}>
                Cancel
              </button>
              <button type="submit">Comment</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

function CommentCard({
  contents,
  createdAt,
  userId,
  like_count,
  updatedAt,
  _id,
  user,
}) {
  const pRef = useRef();
  const [large, setLarge] = useState(false);
  const [readMore, setReadMore] = useState(false);

  // articleId: "6738b371a5d517e4489914d8"
  // contents:"첫번째"
  // createdAt:"2024-11-17T08:39:49.729Z"
  // like_count:0
  // updatedAt:"2024-11-17T08:39:49.729Z"
  // userId:"6728d4b6a37135d548b4effe"
  // _id:"6739abd577bc942f9c47b684"

  // 필요한거
  // 유저 구글 이름
  // 유저 구글 이미지
  // Edit flag
  // Like flag

  // 지우기

  useEffect(() => {
    if (pRef.current) {
      const lineCount = pRef.current.value.split('\n').length;
      if (lineCount > 2) {
        setLarge(true);
      }
    }
  }, [pRef.current]);

  function handleRead() {
    setReadMore((prev) => !prev);
  }

  return (
    <>
      <section className="comment__list-card" key={_id}>
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            alt={userId}
          />
        </div>
        <div className="comment__list-content">
          <div className="comment__profile">
            <h3>{userId}</h3>
            <div className="comment__profile-date">
              {dateFormatter(createdAt)}
            </div>
          </div>
          <div className="comment__list-comment">
            <p className={`${large && !readMore && 'hide'}`}>{contents}</p>
            <textarea ref={pRef} value={contents} readOnly />
          </div>
          {large && (
            <button className="comment__list-readmore" onClick={handleRead}>
              {readMore ? 'Show less' : 'Read more'}
            </button>
          )}
          <CommentOption user={user} userId={userId} like_count={like_count} />
        </div>
      </section>
    </>
  );
}

function CommentOption({ user, userId, like_count }) {
  let option = { like_count };
  if (user) {
    option.myComment = userId === user._id;
  }

  const [hasLike, setHasLike] = useState(false);
  function handleLike() {
    setHasLike((prev) => !prev);
  }
  return (
    <div className="comment__option">
      <div className="comment__option-item">
        {/* LIKE */}
        <button onClick={handleLike} title="like comment">
          {hasLike ? <LikeIcon fill={true} /> : <LikeIcon fill={false} />}
        </button>
        {hasLike ? like_count + 1 : like_count}
      </div>
      {option.myComment && (
        <>
          {/* EDIT */}
          <div className="comment__option-item">
            <button title="edit comment">
              <EditIcon />
            </button>
          </div>
          {/* DELETE */}
          <div className="comment__option-item">
            <button title="delete comment">
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticleComment;
