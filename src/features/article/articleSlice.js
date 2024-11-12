import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 필요한 API들
// 1. getArticles - 처음 랜딩 시 보여줄 뉴스들
// 2. getArticlesByCategory - 카테고리 선택 시 보여줄 뉴스들
// 3. saveAndUpdateArticles - 유저의 인터랙션이 있을 시 (댓글/라이크) DB에 저장하고 댓글, 라이크 저장/업데이트

const articleSlice = createSlice({
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

export default articleSlice.reducer;
