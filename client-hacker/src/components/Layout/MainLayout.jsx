import { Layout, Modal, Button, Menu } from 'antd';
import { HomeOutlined, BugOutlined } from '@ant-design/icons';

import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <BugOutlined />,
      label: 'CSRF Attack Demo',
    },
    {
      key: '/ccv',
      icon: <BugOutlined />,
      label: 'Click Jacking Attack',
    },
    {
      key: '/clickjacking-local',
      icon: <BugOutlined />,
      label: 'Click Jacking Attack Local',
    },
  ];

  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <div
          className="wrapper-header"
          style={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <div className="header-left" style={{ marginRight: '24px' }}>
            Attacker
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ flex: 1, minWidth: 0 }}
          />
          <div className="header-right"></div>
        </div>
      </Header>
      <Content>
        <div className="wrapper">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
