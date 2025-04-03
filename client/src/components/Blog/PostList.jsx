import React, { useEffect, useState, useCallback } from 'react';
import { List, message, Avatar } from 'antd';
import axios from '../../utils/axios';
import PostForm from './PostForm';

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

  return (
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
  );
};

export default PostList;
