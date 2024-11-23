import { apiService } from '@/services/apiService';
import { isTokenValid } from '@/utils/auth';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = apiService.getToken(); // Retrieve the token
    if (token && isTokenValid(token)) {
      navigate('/dashboard'); // Redirect to the dashboard if the token is valid
    }
  }, [navigate]);

  return <Outlet />;
};

export default PublicRoute;
