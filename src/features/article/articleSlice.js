import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 필요한 API들
// 1. getArticles - 처음 랜딩 시 보여줄 뉴스들
// 2. getArticlesByCategory - 카테고리 선택 시 보여줄 뉴스들
// 3. saveAndUpdateArticles - 유저의 인터랙션이 있을 시 (댓글/라이크) DB에 저장하고 댓글, 라이크 저장/업데이트

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getArticlesByCategory = createAsyncThunk(
  'articles/getArticlesByCategory',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await api.get('/articles', { params: { category } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateArticleViews = createAsyncThunk(
  'articles/updateArticleViews',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/articles/view/${articleId}`);

      return response.data.article._id;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articleList: [],
    selectedArticle: null,
    selectedCategory: 'business',
    totalArticleCount: 0,
    totalPageNum: 1,
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
    setClearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
    // setSelectedCategory: (state, action) => {
    //   state.selectedCategory = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articleList = action.payload.articles;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getArticlesByCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getArticlesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articleList = action.payload.articles;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getArticlesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateArticleViews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateArticleViews.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.articleList.findIndex(
          (item) => item._id === action.payload
        );
        if (index !== -1) {
          state.articleList[index].views += 1;
        }
        state.error = null;
      })
      .addCase(updateArticleViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
export const {
  setSelectedArticle,
  setClearSelectedArticle,
  // setSelectedCategory,
} = articleSlice.actions;
