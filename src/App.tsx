import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // Ant Design's CSS reset
import { themeAntd } from './constants/ThemeAntd';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={themeAntd}>
      <AppRoutes />
    </ConfigProvider>
  );
};

export default App;
