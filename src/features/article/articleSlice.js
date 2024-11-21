import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { getFavoriteArticles } from '../favorite/favoriteSlice';

const initialState = {
  articleList: [],
  selectedArticle: null,
  selectedCategory: 'business',
  totalArticleCount: 0,
  totalPageNum: 1,
  page: 0,
  loading: false,
  error: null,
  success: false,
};

// 필요한 API들
// 1. getArticles - 처음 랜딩 시 보여줄 뉴스들
// 2. getArticlesByCategory - 카테고리 선택 시 보여줄 뉴스들
// 3. saveAndUpdateArticles - 유저의 인터랙션이 있을 시 (댓글/라이크) DB에 저장하고 댓글, 라이크 저장/업데이트

// 더이상 사용하지 않는 함수??? -> 제거
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
  async ({ page, category }, { rejectWithValue }) => {
    try {
      const response = await api.get('/articles', {
        params: { page: page || 1, category },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateArticleViews = createAsyncThunk(
  'articles/updateArticleViews',
  async (articleId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/articles/view/${articleId}`);
      dispatch(getFavoriteArticles());

      return response.data.article._id;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticle: (state) => {
      state.articleList = [];
      state.selectedArticle = null;
      state.selectedCategory = 'business';
      state.totalArticleCount = 0;
      state.totalPageNum = 1;
      state.page = 0;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
    setClearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
    setUpdatedCommentTotal: (state, action) => {
      const idx = state.articleList.findIndex(
        ({ _id }) => _id === action.payload.articleId
      );

      state.articleList[idx] = {
        ...state.articleList[idx],
        totalCommentCount:
          state.articleList[idx].totalCommentCount + action.payload.increase,
      };
      state.selectedArticle = state.articleList[idx];
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
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
        const newArticles = action.payload.articles.map((item) => {
          item.totalCommentCount = item.comments.length;
          return item;
        });

        state.articleList = [...state.articleList, ...newArticles];
        state.totalPageNum = action.payload.totalPageNum;
        state.page = state.page + 1;
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
  clearArticle,
  setSelectedArticle,
  setClearSelectedArticle,
  setUpdatedCommentTotal,
  setSelectedCategory,
} = articleSlice.actions;
