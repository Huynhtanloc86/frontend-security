import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from '../../utils/axios';

const PostForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.post('/posts', values);
      message.success('Tạo bài viết thành công!');
    } catch (error) {
      message.error('Không thể tạo bài viết');
    }
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="content">
        <Input.TextArea placeholder="Nhập xì ta tút" style={{ height: '54px', width: '570px' }} />
      </Form.Item>
      <Form.Item style={{ marginRight: '0px' }}>
        <Button type="primary" htmlType="submit" style={{ height: '54px', width: '100%' }}>
          Đăng xì ta tút
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
