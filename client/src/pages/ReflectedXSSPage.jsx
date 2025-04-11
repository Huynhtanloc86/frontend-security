import React, { useState } from 'react';
import { Card, Typography, Input, Alert, Divider, Switch } from 'antd';
import MainLayout from '../components/Layout/MainLayout';
import { useSearchParams } from 'react-router-dom';
import { sanitizeHTML, validateInput } from '../utils/sanitize';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const ReflectedXSSPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInput, setUserInput] = useState('');
  const [isProtected, setIsProtected] = useState(true);

  // Xử lý input với biện pháp bảo vệ
  const searchQuery = searchParams.get('q') || '';
  const safeSearchQuery = isProtected ? sanitizeHTML(searchQuery) : searchQuery;

  const handleSearch = (value) => {
    const safeValue = isProtected ? validateInput(value) : value;
    setUserInput(safeValue);
    setSearchParams({ q: safeValue });
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
          <div className="flex justify-between items-center mb-4">
            <Title level={4}>Demo Reflected XSS</Title>
            <div className="flex items-center gap-2">
              <Text>Bật/Tắt bảo vệ XSS:</Text>
              <Switch
                checked={isProtected}
                onChange={setIsProtected}
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            </div>
          </div>

          <div className="mb-4">
            <Paragraph>
              {isProtected ? (
                <Text type="success">
                  Chế độ bảo vệ đang bật. Các payload XSS sẽ bị vô hiệu hóa.
                </Text>
              ) : (
                <Text type="danger">Chế độ bảo vệ đang tắt. Các payload XSS có thể hoạt động.</Text>
              )}
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
                {isProtected ? (
                  <>
                    <div>{safeSearchQuery}</div>

                    <Divider />

                    <Title level={4}>Các biện pháp phòng chống XSS đang được áp dụng:</Title>
                    <ul>
                      <li>Sanitize HTML input để loại bỏ các thẻ và thuộc tính nguy hiểm</li>
                      <li>Encode các ký tự đặc biệt trong HTML</li>
                      <li>Validate input trước khi xử lý</li>
                      <li>Sử dụng textContent thay vì innerHTML khi bảo vệ được bật</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: searchQuery }} />
                    <Paragraph>
                      Trang này chứa lỗ hổng Reflected XSS trong việc xử lý query parameter. Khi bạn
                      nhập payload XSS vào ô tìm kiếm, nó sẽ được phản ánh trực tiếp vào trang thông
                      qua <Text code>dangerouslySetInnerHTML</Text>.
                    </Paragraph>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>

        <Card className="mb-4">
          <Title level={4}>Các payload XSS mẫu (chỉ hoạt động khi bảo vệ tắt):</Title>
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
      </div>
    </MainLayout>
  );
};

export default ReflectedXSSPage;
