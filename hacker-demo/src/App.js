import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
function App() {
  const {  Content, Footer,  } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Layout>
            <Content>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Demo project ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
