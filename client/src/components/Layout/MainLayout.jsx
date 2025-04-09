import React, { useState } from 'react';
import { Layout, Modal, Button, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, BugOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { authService } from '../../services/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();

  const handleLogout = () => {
    authService.logout();
    setUsername(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await authService.login(values.username, values.password);
      message.success('Đăng nhập thành công!');
      setUsername(values.username);
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '/reflected-xss',
      icon: <BugOutlined />,
      label: 'Reflected XSS Demo',
    },
    {
      key: '/attacker',
      icon: <BugOutlined />,
      label: 'DOM XSS Demo',
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
            Blog Dễ Dãi
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ flex: 1, minWidth: 0 }}
          />
          <div className="header-right">
            {username ? (
              <>
                <UserOutlined style={{ marginRight: '10px' }} /> {username} |{' '}
                <LogoutOutlined
                  onClick={handleLogout}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
              </>
            ) : (
              <Button onClick={handleLogin}>Đăng nhập</Button>
            )}
          </div>
        </div>
      </Header>
      <Content>
        <div className="wrapper">{children}</div>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          title="Đăng nhập"
          width={300}
        >
          <Form onFinish={onFinish} form={form}>
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
              <Button type="primary" htmlType="submit" block loading={isLoading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default MainLayout;
