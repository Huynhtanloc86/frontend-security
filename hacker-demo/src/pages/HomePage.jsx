import { Button } from 'antd';
import { Link } from 'react-router-dom';
import PostList from '../components/Blog/PostList';
import MainLayout from '../components/Layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <div style={{ padding: '20px' }}>
        <PostList />
      </div>
    </MainLayout>
  );
};

export default HomePage;
