import React, { useEffect, useRef, useState } from 'react';
import './styles/articleComment.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../../utils/dateFormatter';
import {
  createComment,
  deleteComment,
  suggestComment,
  updateComment,
  clearComment,
} from '../../features/comment/commentSlice';
import LikeIcon from '../../assets/icons/LikeIcon';
import EditIcon from '../../assets/icons/EditIcon';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import Modal from '../../composition/Modal';
import RobotIcon from '../../assets/icons/RobotIcon';
import { useLocation } from 'react-router-dom';
import { setSelectedArticle } from '../../features/article/articleSlice';
import LoadingComment from '../common/LoadingComment';

function ArticleComment({ articleId, commentRef }) {
  const dispatch = useDispatch();
  const { selectedArticle } = useSelector((store) => store.article);
  const location = useLocation();
  const isFromFavorite = location.pathname === '/myfavorite';
  const user = useSelector((store) => store.user.user);
  const [loginError, setLoginError] = useState(
    user ? null : '* You need to log in to comment'
  );
  const { error, commentList, loading } = useSelector(
    (store) => store.comments
  );

  // event handler method
  const eventObj = {
    handleLike: (commentId) => {
      if (!user) {
        setLoginError('* Log in to access the comment feature');
        return;
      }
      const payload = { articleId, commentId, likeRequest: true };
      dispatch(updateComment(payload));
    },
    handleAdd: async ({ payload }) => {
      await dispatch(createComment(payload));
      dispatch(
        setSelectedArticle({
          ...selectedArticle,
          totalCommentCount: selectedArticle.totalCommentCount + 1,
        })
      );
    },
    handleEdit: ({ commentId, contents }) => {
      const payload = { articleId, commentId, contents };
      dispatch(updateComment(payload));
    },
    handleDelete: async (commentId) => {
      await dispatch(deleteComment({ commentId, articleId, isFromFavorite }));
      dispatch(
        setSelectedArticle({
          ...selectedArticle,
          totalCommentCount: selectedArticle.totalCommentCount - 1,
        })
      );
    },
  };

  return (
    <div className="comment" ref={commentRef}>
      {loading && <LoadingComment />}

      <span style={{ color: 'red' }}>{loginError}</span>
      {/* user write comment */}
      {user && (
        <CommentUser
          articleId={articleId}
          user={user}
          isFromFavorite={isFromFavorite}
          eventObj={eventObj}
        />
      )}
      {/* comment lists */}
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

function CommentUser({ articleId, user, isFromFavorite, eventObj }) {
  const dispatch = useDispatch();

  const textRef = useRef();
  const [hasComment, setHasComment] = useState(false);
  const [hasUsedSuggestion, setHasUsedSuggestion] = useState(false);
  const suggestedComment = useSelector(
    (state) => state.comments.suggestedComment
  );

  // textarea 사이즈 계산
  function handleInput() {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
      setHasComment(textarea.value !== '');

      // 유저가 코멘트에 아무것도 안적을 때 ai에서 보낸 추천 댓글 비우기
      if (textarea.value === '') dispatch(clearComment());
    }
  }

  // 서버에 작성한 댓글 올리기
  function handleSubmit(e) {
    e.preventDefault();
    const { value } = textRef.current;
    if (!user) return;

    if (value.trim() === '') return;
    const payload = { articleId, contents: value, isFromFavorite };
    eventObj.handleAdd({ payload });
    handleReset();
  }

  function handleReset() {
    const textarea = textRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 1}px`;

    //유저가 코멘트 캔슬을 누르면 ai 아이콘도 사라져야함
    dispatch(clearComment());
    setHasComment(false);
    setHasUsedSuggestion(false);

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.value = '';
    }
  }

  function handleSuggestComment() {
    if (suggestedComment !== '') {
      setHasUsedSuggestion(true);
      const textarea = textRef.current;

      // ai 가 "" 안에 추천 댓글을 알려주는 경우에 대비해 그 부분만 코멘트에 복붙
      const matches = suggestedComment.match(/"(.*?)"/);

      // 유저가 suggestedComment 를 클릭하면 그대로 코멘트에 복붙
      if (textarea) {
        textarea.value = matches ? matches[1] : suggestedComment;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 1}px`;
      }
    } else {
      dispatch(suggestComment({ comment: textRef.current.value }));
    }
  }

  return (
    <>
      <div className="comment__user">
        <div className="image-container">
          <img src={user.picture} alt="your profile pic" />
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
          {hasComment && !hasUsedSuggestion && (
            <button
              className={`comment__ai ${
                suggestedComment && 'comment__ai--active'
              }`}
              type="button"
              onClick={handleSuggestComment}
            >
              <RobotIcon />{' '}
              {suggestedComment
                ? 'Tap here to use the suggestion!'
                : 'Do you want to get a suggested comment from me?'}
            </button>
          )}
          {suggestedComment && !hasUsedSuggestion && (
            <RenderingAi suggestedComment={suggestedComment} />
          )}
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

function RenderingAi({ suggestedComment }) {
  const [aiText, setAiText] = useState('');
  useEffect(() => {
    if (suggestedComment) {
      let c = 0;
      let m = suggestedComment.length - 1;
      let timer = setInterval(() => {
        setAiText(suggestedComment.slice(0, c + 1));
        c = c + 1;
        if (c > m) {
          clearInterval(timer);
        }
      }, 25);
    }
    return () => {
      setAiText('');
    };
  }, [suggestedComment]);

  return (
    <div>
      <p className="comment__ai-text">{aiText}</p>
    </div>
  );
}

function CommentCard({ comment, user, eventObj }) {
  const textRef = useRef();
  const editRef = useRef();
  const [large, setLarge] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 댓글 줄 횟수 계산
  useEffect(() => {
    if (textRef.current) {
      const lineCount = textRef.current.value.split('\n').length;
      if (lineCount > 2) {
        setLarge(true);
      }
    }
  }, [textRef.current]);

  // edit 눌렀을시에 textarea 초기 높이 수정하기
  useEffect(() => {
    if (isEditing) {
      handleInput();
      editRef.current.focus();
    }
  }, [isEditing]);

  // textarea 사이즈 계산
  function handleInput() {
    const textarea = editRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 1}px`;
    }
  }

  // 댓글 수정하기
  function handleEditSubmit(e) {
    e.preventDefault();
    if (!editRef.current.value) {
      setIsEditing(false);
      setReadMore(true);
      return;
    }
    eventObj.handleEdit({
      commentId: comment._id,
      contents: editRef.current.value,
    });
    setIsEditing(false);
    setReadMore(true);
  }

  return (
    <section className="comment__list-card" key={comment._id}>
      <div className="image-container">
        <img src={comment.userId.picture} alt={comment.userId.name} />
      </div>
      <div className="comment__list-content">
        <div className="comment__profile">
          <h3>{comment.userId.name}</h3>
          <div className="comment__profile-date">
            {dateFormatter(comment.createdAt)}
          </div>
        </div>
        <div className="comment__list-comment">
          {isEditing ? (
            <form onSubmit={handleEditSubmit}>
              <textarea
                className="comment__list-edit"
                ref={editRef}
                onInput={handleInput}
                defaultValue={comment.contents}
                rows={1}
              />
              <div className="comment__list-btn-box">
                <button type="submit">Edit</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className={`${large && !readMore && 'hide'}`}>
                {comment.contents}
              </p>
              <textarea
                className="display-none"
                ref={textRef}
                value={comment.contents}
                readOnly
              />
            </>
          )}
        </div>
        {comment.isEdited && (
          <div className="comment__list-edited">(edited)</div>
        )}
        {!isEditing && large && (
          <button
            className="comment__list-readmore"
            onClick={() => setReadMore((prev) => !prev)}
          >
            {readMore ? 'Show less' : 'Read more'}
          </button>
        )}
        <CommentOption
          user={user}
          comment={comment}
          eventObj={eventObj}
          setIsEditing={setIsEditing}
        />
      </div>
    </section>
  );
}

function CommentOption({ comment, user, eventObj, setIsEditing }) {
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
              <button
                title="edit comment"
                onClick={() => setIsEditing((prev) => !prev)}
              >
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
