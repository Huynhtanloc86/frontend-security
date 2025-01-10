import React, { useEffect, useState } from 'react';
import { List, Card, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts');
      setPosts(response.data);
    } catch (error) {
      message.error('Không thể tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={posts}
      loading={loading}
      renderItem={(post) => (
        <List.Item>
          <Card title={post.title}>
            <p dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + '...' }} />
            <Link to={`/post/${post.id}`}>Xem thêm</Link>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default PostList;
