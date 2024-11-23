import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu, Avatar, Badge, Typography, Dropdown, Button } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import MainHeader from './components/MainHeader';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AuthLayout: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  // Menu items for sidebar
  const sidebarMenuItems = [
    { key: '1', icon: <UserOutlined />, label: 'Users' },
    { key: '2', icon: <SettingOutlined />, label: 'Settings' },
    // Add other menu items here
  ];

  // Dropdown menu for user profile
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <SettingOutlined />
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      {/* Layout for header and content */}
      <Layout>
        <MainHeader />
        {/* Main Content */}
        <Content
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
