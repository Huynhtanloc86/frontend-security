import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import PostList from '../components/Blog/PostList';
import MainLayout from '../components/Layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <Link to="/create-post">
            <Button type="primary">Tạo bài viết mới</Button>
          </Link>
        </div>
        <PostList />
      </div>
    </MainLayout>
  );
};

export default HomePage; 