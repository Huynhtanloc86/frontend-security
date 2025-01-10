import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const PostForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post('/posts', values);
      message.success('Tạo bài viết thành công!');
      navigate('/');
    } catch (error) {
      message.error('Không thể tạo bài viết');
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="content"
        label="Nội dung"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng bài
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm; 