import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import './App.css';
import HomePage from './pages/HomePage';
import CSRFAttackPage from './pages/CSRFAttackPage';

function App() {
  const { Content, Footer } = Layout;

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
                <Route path="/" element={<HomePage />} />
                <Route path="/csrf-attack" element={<CSRFAttackPage />} />
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
