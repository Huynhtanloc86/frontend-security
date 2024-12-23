import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AnalyticsData from './components/AnalyticsData';
import './App.css';
function App() {
  const { Header, Content, Footer, Sider } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const CLIENT_ID = '826606453095-g87thpv9bgjk4gd1avpn9tlpds87b7ha.apps.googleusercontent.com';

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider breakpoint="lg" />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 800,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <AnalyticsData />
              </GoogleOAuthProvider>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
