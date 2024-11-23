import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Spin, message } from 'antd';
import MyInput from 'forms/MyInput';
import Colors from 'constants/Colors';
import HelloImage from '@/assets/auth/hello.svg';
import { apiService } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

   // Check if user is already logged in
   useEffect(() => {
    const token = apiService.getToken(); // Retrieve the token
    if (token) {
      navigate('/'); // Redirect to the dashboard if the token is valid
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await apiService.post('/v2/admins/sign_in', data); // Call login API
      const { access_token, admin } = response.data; // Assume the API returns a token
      apiService.setToken(access_token); // Save the token in apiService
      apiService.setCurrentUser(admin); // Save the token in apiService
      message.success('Login successful!');
      navigate('/'); // Redirect to the dashboard
    } catch (error: any) {
      message.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex max-w-6xl w-full bg-white rounded-xl shadow-lg">
        {/* Left Panel */}
        <div className="flex-1 bg-primary text-white rounded-l-xl flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold">CONVOY</h1>
          <p className="text-sm mt-2">by SimpleLabx</p>
          <img
            src={HelloImage}
            alt="Welcome"
            className="mt-10 max-w-full"
          />
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold mb-4">LOGIN</h2>
          <p className="text-lg font-semibold mb-2">WELCOME TO CONVOY</p>
          <p className="text-sm text-gray mb-6">
            Need a Convoy account?{' '}
            <a href="/signup" className="text-primary font-semibold">
              Sign Up Now
            </a>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <MyInput
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email}
              control={control}
            />
            <MyInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={errors.password}
              control={control}
            />
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 py-2 text-white flex justify-center items-center"
              style={{ backgroundColor: Colors.primary }}
              disabled={loading}
            >
              {loading ? <Spin /> : 'Login'}
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            <a href="/forgot-password" className="text-primary">
              Forgot Your Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
