import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from '@/routes/PublicRoute';
import PrivateRoute from '@/routes/PrivateRoute';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/unauth/Login';
import Dashboard from '@/pages/auth/Dashboard';
import { apiService } from '@/services/apiService';
import { isTokenValid } from '@/utils/auth';
import HolidayGroupPage from '@/pages/auth/HolidayGroupPage';

const AppRoutes: React.FC = () => {
  const getDefaultRedirect = (): string => {
    const token = apiService.getToken();
    if (token && isTokenValid(token)) {
      return '/'; // Redirect to dashboard if token is valid
    }
    return '/login'; // Redirect to login otherwise
  };

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        {/* <Route path="/" element={<Navigate to={getDefaultRedirect()} replace />} /> */}

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Authenticated Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/holiday-groups" element={<HolidayGroupPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
