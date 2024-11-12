import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import articleSlice from './article/articleSlice';
import favoriteSlice from './favorite/favoriteSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    article: articleSlice,
    favorite: favoriteSlice,
  },
});

export default store;
