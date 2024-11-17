import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import articleSlice from './article/articleSlice';
import favoriteSlice from './favorite/favoriteSlice';
import commentSlice from './comment/commentSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    article: articleSlice,
    favorite: favoriteSlice,
    comments: commentSlice,
  },
});

export default store;
