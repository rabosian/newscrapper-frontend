import React, { useEffect, useRef, useState } from 'react';
import { dateFormatter } from '../../utils/dateFormatter';
import './styles/articleComment.style.css';
import { useSelector } from 'react-redux';

function ArticleComment({ commentRef, tempComments, setTempComments }) {
  const user = useSelector((store) => store.user.user);

  return (
    <div className="comment" ref={commentRef}>
      {/* user */}
      <CommentUser user={user} setTempComments={setTempComments} />
      {/* others */}
      <div className="comment__list">
        {tempComments.map((item) => (
          <CommentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function CommentUser({ user, setTempComments }) {
  const textRef = useRef();

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

    if (value.trim() === '') return;

    // 이 값을 서버에 보내면 될 듯
    // 유저 아이디 + 유저가 입력한 값
    // const payload = { userId: user._id, comment: value };

    // 테스트용 - 코멘트가 추가됨
    setTempComments((prev) => [
      ...prev,
      {
        userId: user._id,
        comment: value,
        name: user.name,
        id: new Date(Date.now()).toISOString(),
      },
    ]);

    handleReset();
  }

  function handleReset() {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  }

  return (
    <div className="comment__user">
      <div className="image-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          alt="your profile pic"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="comment__user-comment">
          <textarea
            ref={textRef}
            placeholder="Add a comment..."
            name="comment"
            onInput={handleInput}
            rows={1}
          />
        </div>
        <div className="comment__user-btns">
          <button type="button" onClick={handleReset}>
            Cancel
          </button>
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
}

function CommentCard({ userId, comment, name, id }) {
  const pRef = useRef();
  const [large, setLarge] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (comment) {
      // console.log(comment.length);
    }
  }, [comment]);

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
      <section className="comment__list-item" key={id}>
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            alt={name}
          />
        </div>
        <div className="comment__list-content">
          <div className="comment__profile-name">
            <h3>{name}</h3>
            <div className="comment__profile-date">{dateFormatter(id)}</div>
          </div>
          <div className="comment__list-comment">
            <div className="comment__list-comment-top">
              <p className={`${large && !readMore && 'hide'}`}>{comment}</p>
              <textarea ref={pRef} value={comment} readOnly />
              <button>::</button>
            </div>
            {large && (
              <button
                className="comment__list-comment-bot"
                onClick={handleRead}
              >
                {readMore ? 'read less' : 'read more'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticleComment;
