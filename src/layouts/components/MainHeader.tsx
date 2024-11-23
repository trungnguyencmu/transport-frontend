import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Layout } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { apiService } from '@/services/apiService'; // Ensure the path is correct
import {
  NotificationsNone
} from '@mui/icons-material';
import './MainHeader.scss'; // Updated to use Header.scss

const { Header } = Layout;

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve and decode the token to get user information
  // const token = apiService.getCurrentUser();
  let currentUser: User | null = apiService.getCurrentUser();

  // if (currentUser) {
  //   try {
  //     currentUser = jwtDecode<User>(token); // Decode the token to get user info
  //   } catch (error) {
  //     console.error('Failed to decode token:', error);
  //     currentUser = null;
  //   }
  // }

  // Fallback user info if token is not valid or missing
  // currentUser = currentUser || {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   email: 'john.doe@example.com',
  // };

  const handleLogout = () => {
    apiService.clearToken(); // Clear the token from storage
    navigate('/login'); // Redirect to login page
  };

  const menuItems = [
    {
      key: '1',
      label: <span>Log out</span>,
      onClick: () => {
        handleLogout();
      },
    },
  ];
  console.log('currentUser', currentUser);

  return (
    <Header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img
          src="src/assets/logo-small.svg"
          width={40}
          height={40}
          alt="logo"
        />
        <span>SimpleLabx</span>
      </div>

      <div className="accountInfo">
        {/* Notification Icon */}
        <div className="notificationWrap">
          <NotificationsNone
            width={24}
            height={24}
          />
        </div>

        {/* User Dropdown */}
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
          <div className="flex items-center gap-3 pl-3 cursor-pointer">
            <div>
              <img
                src="src/assets/logo-small.svg"
                width={32}
                height={32}
                alt="user avatar"
              />
            </div>
           
            <div className="flex flex-col">
              <div className="name leading-4">
                {currentUser?.first_name} {currentUser?.last_name}
              </div>
              <div className="email leading-4">{currentUser?.email}</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default MainHeader;
