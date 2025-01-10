import React from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';

const { Title } = Typography;

const RegisterPage = () => {
  return (
    <div style={{ 
      maxWidth: 400, 
      margin: '100px auto', 
      padding: '0 20px' 
    }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center' }}>
          Đăng ký
        </Title>
        <RegisterForm />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage; 