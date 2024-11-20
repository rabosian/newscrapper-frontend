import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 필요한 API들
// 1. getFavoriteArticles - 유저가 즐겨찾기 한 기사들 (타이틀만 가져올거면 2번도 필요함)
// 2. getFavoriteArticlesDetails - TO BE DETERMINED (TBD)
// 3. deleteFavoriteArticle - 유저가 즐겨찾기 취소할 경우 테이블에서 지움
// 4. addFavoriteArticle

export const getFavoriteArticles = createAsyncThunk(
  'myfavorite/getFavoriteArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/favorites');
      return response.data.favorites;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addFavoriteArticle = createAsyncThunk(
  'myfavorite/addFavoriteArticle',
  async ({ articleId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/favorites', { articleId });
      dispatch(getFavoriteArticles());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteFavoriteArticle = createAsyncThunk(
  'myfavorite/deleteFavoriteArticle',
  async ({ articleId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/favorites/${articleId}`);
      dispatch(getFavoriteArticles());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getFavoriteArticlesDetails = createAsyncThunk();

const favoriteSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: [],
    selectedArticle: null,
    totalArticleCount: 0,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavoriteArticles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFavoriteArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.articleList = action.payload.articleList;
        state.totalArticleCount = action.payload.articleList.length;
      })
      .addCase(getFavoriteArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteFavoriteArticle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteFavoriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(deleteFavoriteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(addFavoriteArticle.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFavoriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(addFavoriteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
export const { setSelectedArticle } = favoriteSlice.actions;
