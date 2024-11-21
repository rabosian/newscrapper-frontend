import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setUpdatedCommentTotal } from '../article/articleSlice';
import {
  getFavoriteArticles,
  setUpdatedCommentTotalFavorite,
} from '../favorite/favoriteSlice';

export const getComments = createAsyncThunk(
  'comments/getComments',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await api.get('/comments', { params: { articleId } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (
    { articleId, contents, isFromFavorite },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post('/comments', { articleId, contents });
      await dispatch(getComments(articleId));
      await dispatch(setUpdatedCommentTotal({ articleId, increase: 1 }));
      if (isFromFavorite) dispatch(getFavoriteArticles());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (
    { articleId, commentId, isFromFavorite },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await api.delete(`/comments/${commentId}`);
      await dispatch(getComments(articleId));
      await dispatch(setUpdatedCommentTotal({ articleId, increase: -1 }));
      if (isFromFavorite) dispatch(getFavoriteArticles());
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
