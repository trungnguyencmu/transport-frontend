import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DirectionsBus,
  School,
  Tune,
  Map,
  Business,
  Analytics,
  Message,
  Group,
  Feedback,
  Settings,
  Link as LinkIcon,
  EventNote,
  BusinessCenter,
  AltRoute,
  List,
  History,
  PushPin,
  LocationOn
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Sidebar.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;
// import MapIcon from '@mui/icons-material/Map';
const MENU_WITH_SUBMENU = ['routes', 'assign-trip', 'school-bus'];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKey, setOpenKey] = useState<string[]>([]);
  const [siderKey, setSiderKey] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const path = location.pathname.length > 1 ? location.pathname.slice(0, -1) : '/';
    MENU_WITH_SUBMENU.forEach((menu) => {
      if (path === '/') {
        setOpenKey(['assign-trip']);
      } else {
        path.includes(menu) && setOpenKey([menu]);
      }
    });
    setSiderKey(path);
  }, [location.pathname]);

  const handleMenuClick = (key: string) => {
    setSiderKey(key);
    navigate(key); // Navigate using React Router
  };

  const handleSubMenuClick = (key: string) => {
    if (openKey.includes(key)) {
      setOpenKey(openKey.filter((k) => k !== key));
    } else {
      setOpenKey([...openKey, key]);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={264}
      theme="dark"
      style={{ backgroundColor: '#004F59' }}
    >
      <div className='sidebar-logo px-6 py-4 text-white'>
        {collapsed ? 'C' : 'CONVOY'}
      </div>

      <Menu
        className="wrap-menu px-3"
        mode="inline"
        theme="light"
        selectedKeys={[siderKey]}
        openKeys={collapsed ? [] : openKey}
        onOpenChange={(keys) => setOpenKey(keys as string[])}
        style={{ fontWeight: 'bold' }}
      >
        {/* SubMenu for Routes */}
        <SubMenu
          className={`has-sub-menu ${(openKey.includes('routes') || siderKey === '/routes') && 'sub-menu-opened'} ${collapsed && 'collapsed'}`}
          key="routes"
          icon={<AltRoute />}
          title="Routes"
          onTitleClick={() => handleSubMenuClick('routes')}
        >
          <Menu.Item key="/routes/live-view" onClick={() => handleMenuClick('/routes/live-view')} icon={<Map />}>
            Live View
          </Menu.Item>
          <Menu.Item key="/routes/trips" onClick={() => handleMenuClick('/routes/trips')} icon={<List />}>
            Routes Listing
          </Menu.Item>
          <Menu.Item key="/routes/history" onClick={() => handleMenuClick('/routes/history')} icon={<History />}>
            Trip History
          </Menu.Item>
          <Menu.Item key="/routes/location-history" onClick={() => handleMenuClick('/routes/location-history')} icon={<PushPin />}>
            Location History
          </Menu.Item>
          <Menu.Item key="/routes/saved-points" onClick={() => handleMenuClick('/routes/saved-points')} icon={<LocationOn />}>
            Saved Points
          </Menu.Item>
        </SubMenu>

        {/* SubMenu for Assign Trip */}
        <SubMenu
          className={`has-sub-menu ${(openKey.includes('assign-trip') || siderKey === '/') && 'sub-menu-opened'} ${collapsed && 'collapsed'}`}
          key="assign-trip"
          icon={<EventNote />}
          title="Assign Trip"
          onTitleClick={() => handleSubMenuClick('assign-trip')}
        >
          <Menu.Item key="/" onClick={() => handleMenuClick('/')} icon={<EventNote />}>
            Assign Trip
          </Menu.Item>
          <Menu.Item key="/assign-trip/trip-listing" onClick={() => handleMenuClick('/assign-trip/trip-listing')} icon={<List />}>
            List View
          </Menu.Item>
        </SubMenu>

        {/* SubMenu for School Bus */}
        <SubMenu
          className={`has-sub-menu ${(openKey.includes('school-bus') || siderKey === '/school-bus') && 'sub-menu-opened'} ${collapsed && 'collapsed'}`}
          key="school-bus"
          icon={<School />}
          title="School Bus"
          onTitleClick={() => handleSubMenuClick('school-bus')}
        >
          <Menu.Item key="/school-bus/school-site" onClick={() => handleMenuClick('/school-bus/school-site')}>
            School Site
          </Menu.Item>
          <Menu.Item key="/school-bus/trips" onClick={() => handleMenuClick('/school-bus/trips')}>
            Routes Listing
          </Menu.Item>
        </SubMenu>

        {/* Other Menu Items */}
        <Menu.Item className={` custom-menu-item ${siderKey.includes("vehichles") && 'selected'}`} key="/vehicles" icon={<DirectionsBus />} onClick={() => handleMenuClick('/vehicles')}>
          Vehicles
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("sites") && 'selected'}`} key="/sites" icon={<Business />} onClick={() => handleMenuClick('/sites')}>
          Sites
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("notices") && 'selected'}`} key="/notices" icon={<Message />} onClick={() => handleMenuClick('/notices')}>
          Notices
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("users") && 'selected'}`} key="/users" icon={<Group />} onClick={() => handleMenuClick('/users')}>
          Users
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("clients") && 'selected'}`} key="/clients" icon={<BusinessCenter />} onClick={() => handleMenuClick('/clients')}>
          Clients
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("reports") && 'selected'}`} key="/reports" icon={<Analytics />} onClick={() => handleMenuClick('/reports')}>
          Reports
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("feedback") && 'selected'}`} key="/feedback" icon={<Feedback />} onClick={() => handleMenuClick('/feedback')}>
          Feedback
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("settings") && 'selected'}`} key="/settings" icon={<Settings />} onClick={() => handleMenuClick('/settings')}>
          Settings
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("links") && 'selected'}`} key="/links" icon={<LinkIcon />} onClick={() => handleMenuClick('/links')}>
          Links
        </Menu.Item>
        <Menu.Item className={` custom-menu-item ${siderKey.includes("holidays") && 'selected'}`} key="/holiday-groups" icon={<EventNote />} onClick={() => handleMenuClick('/holiday-groups')}>
          Holidays
        </Menu.Item>
      </Menu>

      {/* Footer for Mobile */}
      {isMobile && (
        <div
          style={{
            textAlign: 'center',
            padding: '16px',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Tune />
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
