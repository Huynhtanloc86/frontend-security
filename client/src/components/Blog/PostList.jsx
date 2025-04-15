import React, { useEffect, useState, useCallback } from 'react';
import { List, message } from 'antd';
import axios from '../../utils/axios';
import PostForm from './PostForm';
import { ReloadOutlined } from '@ant-design/icons';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get('/posts/post_list');
      setPosts(response.data.posts.reverse());
    } catch (error) {
      message.error('Không thể tải bài viết');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      const response = await axios.post('/posts/refresh');
      setPosts(response.data.posts.reverse());
    } catch (error) {
      message.error('Không thể làm mới bài viết');
    }
  }, []);

  return (
    <>
      <List
        header={<PostForm fetchPosts={fetchPosts} />}
        bordered
        dataSource={posts}
        loading={loading}
        renderItem={(item, index) => {
          return (
            <List.Item key={index}>
              <div id="message" dangerouslySetInnerHTML={{ __html: item?.content }} />
            </List.Item>
          );
        }}
      />
      <a
        style={{ cursor: 'pointer', paddingTop: '10px', display: 'block', textAlign: 'right' }}
        onClick={handleRefresh}
      >
        <ReloadOutlined /> Làm mới
      </a>
    </>
  );
};

export default PostList;
