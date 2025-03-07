import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

const { Title } = Typography;

const LoginPage = () => {
  return (
    <div style={{ 
      maxWidth: 400, 
      margin: '100px auto', 
      padding: '0 20px' 
    }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}>
          Đăng nhập
        </Title>
        <LoginForm />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage; 