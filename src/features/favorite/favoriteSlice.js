import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 필요한 API들
// 1. getFavoriteArticles - 유저가 즐겨찾기 한 기사들 (타이틀만 가져올거면 2번도 필요함)
// 2. getFavoriteArticlesDetails - TO BE DETERMINED (TBD)
// 3. deleteFavoriteArticle - 유저가 즐겨찾기 취소할 경우 테이블에서 지움

const favoriteSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesList: [],
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
  },
  extraReducers: (builder) => {},
});

export default favoriteSlice.reducer;
