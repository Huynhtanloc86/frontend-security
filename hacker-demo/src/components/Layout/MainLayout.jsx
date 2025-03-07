import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="wrapper">
          <div style={{ color: 'white', fontSize: '18px' }}>Blog Dễ Dãi</div>
          <Button type="link" onClick={handleLogout} style={{ color: 'white' }}>
            Đăng xuất
          </Button>
        </div>
      </Header>
      <Content>
        <div className="wrapper">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
