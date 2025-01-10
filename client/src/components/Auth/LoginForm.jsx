import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await authService.login(values.username, values.password);
      message.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm; 