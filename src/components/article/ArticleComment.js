import React, { useEffect, useRef, useState } from 'react';
import './styles/articleComment.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../../utils/dateFormatter';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../../features/comment/commentSlice';
import LikeIcon from '../../assets/icons/LikeIcon';
import EditIcon from '../../assets/icons/EditIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import Modal from '../../composition/Modal';

function ArticleComment({ articleId, commentRef }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const [loginError, setLoginError] = useState(null);
  const { error, commentList } = useSelector((store) => store.comments);

  const eventObj = {
    handleLike: (commentId) => {
      if (!user) {
        setLoginError('Log in to access the comment feature');
        return;
      }
      const payload = { articleId, commentId, likeRequest: true };
      dispatch(updateComment(payload));
    },
    handleEdit: (commentId) => {},
    handleDelete: (commentId) => {
      dispatch(deleteComment({ commentId, articleId }));
    },
  };

  return (
    <div className="comment" ref={commentRef}>
      <span style={{ color: 'red' }}>{loginError}</span>
      {/* user */}
      {user && <CommentUser articleId={articleId} user={user} />}
      {/* others */}
      <div className="comment__list">
        {!error &&
          commentList.map((item) => (
            <CommentCard
              key={item._id}
              comment={item}
              user={user}
              eventObj={eventObj}
              loginError={loginError}
            />
          ))}
      </div>
    </div>
  );
}

function CommentUser({ articleId, user }) {
  const dispatch = useDispatch();
  const textRef = useRef();

  // textarea 사이즈 계산
  function handleInput() {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
    }
  }

  // 서버에 작성한 댓글 올리기
  function handleSubmit(e) {
    e.preventDefault();
    const { value } = textRef.current;
    if (!user) return;

    if (value.trim() === '') return;
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

  return (
    <>
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
          />
          <div className="comment__user-btns">
            <button type="button" onClick={handleReset}>
              Cancel
            </button>
            <button type="submit">Comment</button>
          </div>
        </form>
      </div>
    </>
  );
}

function CommentCard({ comment, user, eventObj }) {
  const pRef = useRef();
  const [large, setLarge] = useState(false);
  const [readMore, setReadMore] = useState(false);

  // 댓글 줄 횟수 계산
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
      <section className="comment__list-card" key={comment._id}>
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
            alt={comment.userId.name}
          />
        </div>
        <div className="comment__list-content">
          <div className="comment__profile">
            <h3>{comment.userId.name}</h3>
            <div className="comment__profile-date">
              {dateFormatter(comment.createdAt)}
            </div>
          </div>
          <div className="comment__list-comment">
            <p className={`${large && !readMore && 'hide'}`}>
              {comment.contents}
            </p>
            <textarea ref={pRef} value={comment.contents} readOnly />
          </div>
          {large && (
            <button className="comment__list-readmore" onClick={handleRead}>
              {readMore ? 'Show less' : 'Read more'}
            </button>
          )}
          <CommentOption user={user} comment={comment} eventObj={eventObj} />
        </div>
      </section>
    </>
  );
}

function CommentOption({ comment, user, eventObj, handleEdit }) {
  const [modalOn, setModalOn] = useState(false);
  let hasLike = comment.likes.find((item) => item.userId === user?._id);

  return (
    <>
      <div className="comment__option">
        <div className="comment__option-item">
          {/* LIKE */}
          <button
            onClick={() => eventObj.handleLike(comment._id)}
            title="like comment"
          >
            {hasLike ? <LikeIcon fill={true} /> : <LikeIcon fill={false} />}
          </button>
          {comment.totalLike}
        </div>
        {comment.userId._id === user?._id && (
          <>
            {/* EDIT */}
            <div className="comment__option-item">
              <button title="edit comment" onClick={handleEdit}>
                <EditIcon />
              </button>
            </div>
            {/* DELETE */}
            <div className="comment__option-item">
              <button title="delete comment" onClick={() => setModalOn(true)}>
                <DeleteIcon />
              </button>
            </div>
          </>
        )}
      </div>
      {modalOn && (
        <Modal setModalOn={setModalOn}>
          <div className="modal__title">
            Would you like to <span>delete</span> this comment?
          </div>
          <div className="modal__btn-box">
            <button
              className="modal__btn modal__btn--warn"
              onClick={() => {
                eventObj.handleDelete(comment._id);
                setModalOn(false);
              }}
            >
              Delete
            </button>
            <button onClick={() => setModalOn(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ArticleComment;
