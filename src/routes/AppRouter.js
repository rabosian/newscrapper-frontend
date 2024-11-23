import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage/HomePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/AuthPage/LoginPage';
import FavoritePage from '../pages/FavoritePage/FavoritePage';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleModal from '../components/article/ArticleModal';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

const AppRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/myfavorite" element={<FavoritePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ArticleModal />
      <Footer />
    </div>
  );
};

export default AppRouter;
