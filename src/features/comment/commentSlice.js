import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setUpdatedCommentTotal } from '../article/articleSlice';
import { getFavoriteArticles } from '../favorite/favoriteSlice';

// 필요한 API들
// 1. getComments - 선택된 article의 댓글 가져오기
// 2. deleteComment
// 3. updateComment - like 추가
// 4. suggestComment - AI

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (articleId, { rejectWithValue }) => {
    try {
      // GET에서 body를 지원하지 않기 때문에 query로 보냄.
      const response = await api.get('/comments', { params: { articleId } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ articleId, contents }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/comments', { articleId, contents });
      dispatch(getComments(articleId));
      dispatch(setUpdatedCommentTotal({ articleId, increase: 1 }));
      dispatch(getFavoriteArticles());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ articleId, commentId }, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/comments/${commentId}`);
      dispatch(getComments(articleId));
      dispatch(setUpdatedCommentTotal({ articleId, increase: -1 }));
      dispatch(getFavoriteArticles());
      return commentId;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (
    { articleId, commentId, contents, likeRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/comments/${commentId}`, {
        contents,
        likeRequest,
      });
      dispatch(getComments(articleId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const suggestComment = createAsyncThunk(
  'ai/suggestComment',
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await api.post('/ai', { comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    commentList: [],
    selectedArticle: null,
    loading: false,
    error: null,
    success: false,
    suggestedComment: '',
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearComment: (state) => {
      state.suggestedComment = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.commentList = action.payload.commentList.reverse();
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(suggestComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(suggestComment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.suggestedComment = action.payload.suggestedComment.content;
      })
      .addCase(suggestComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
export const { clearComment } = commentSlice.actions;
