import React from 'react';
import { Card } from 'antd';
import PostForm from '../components/Blog/PostForm';
import MainLayout from '../components/Layout/MainLayout';

const CreatePostPage = () => {
  return (
    <MainLayout>
      <div style={{ maxWidth: 800, margin: '20px auto', padding: '0 20px' }}>
        <Card title="Tạo bài viết mới">
          <PostForm />
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreatePostPage; 