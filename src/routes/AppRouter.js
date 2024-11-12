import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from '../page/RegisterPage/RegisterPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;
