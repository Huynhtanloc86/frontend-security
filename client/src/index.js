import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';

// Bảo vệ chống clickjacking bằng JavaScript
// Kiểm tra nếu trang web đang được load trong iframe (window !== window.top)
// Nếu đúng, chuyển hướng về trang chính
// if (window !== window.top) {
//   console.log('Phát hiện đang trong iframe, chuyển hướng về trang chính');
//   window.top.location = window.location;
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
