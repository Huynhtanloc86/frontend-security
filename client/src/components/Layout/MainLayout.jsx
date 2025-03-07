import React, { useState } from 'react';
import { Layout, Modal, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { authService } from '../../services/auth';

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));

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
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Header>
        <div className="wrapper-header">
          <div className="header-left">Blog Dễ Dãi</div>
          <div className="header-right">
            {username ? (
              <>
                <UserOutlined /> {username} | <LogoutOutlined onClick={handleLogout} />
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
