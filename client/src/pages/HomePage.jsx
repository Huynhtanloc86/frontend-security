import { Button } from 'antd';
import { Link } from 'react-router-dom';
import PostList from '../components/Blog/PostList';
import MainLayout from '../components/Layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <PostList />
    </MainLayout>
  );
};

export default HomePage;
