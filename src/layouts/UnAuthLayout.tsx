import React from 'react';
import { Outlet } from 'react-router-dom';

const UnAuthLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet /> {/* Renders child routes */}
      </main>
    </div>
  );
};

export default UnAuthLayout;
