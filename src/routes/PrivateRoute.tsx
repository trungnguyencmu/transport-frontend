import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { apiService } from '@/services/apiService'; // Use absolute path
import { isTokenValid } from '@/utils/auth'; // Use absolute path

const PrivateRoute: React.FC = () => {
  const token = apiService.getToken(); // Retrieve the token
  // Check if the token is missing or invalid
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render the protected component
};

export default PrivateRoute;
