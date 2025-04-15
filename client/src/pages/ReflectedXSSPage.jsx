import React, { useState } from 'react';
import { Card, Typography, Input, Switch } from 'antd';
import MainLayout from '../components/Layout/MainLayout';
import { useSearchParams } from 'react-router-dom';
import { sanitizeHTML, validateInput } from '../utils/sanitize';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const ReflectedXSSPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInput, setUserInput] = useState('');
  const [isProtected, setIsProtected] = useState(false);

  // Xử lý input với biện pháp bảo vệ
  const searchKey = searchParams.get('key') || '';
  const safeSearchKey = isProtected ? sanitizeHTML(searchKey) : searchKey;

  const handleSearch = (value) => {
    const safeValue = isProtected ? validateInput(value) : value;
    setUserInput(safeValue);
    setSearchParams({ key: safeValue });
  };
  console.log(searchKey);
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <Title level={2}>Reflected XSS Attack Demo</Title>
        <Card className="mb-4" title="Giới thiệu Reflected XSS">
          <Paragraph>
            Reflected XSS (Cross-Site Scripting) là một loại tấn công mà kẻ tấn công có thể chèn mã
            JavaScript độc hại vào trang web thông qua việc gửi payload trong URL hoặc form input.
          </Paragraph>
          <Paragraph>
            Khác với Stored XSS, Reflected XSS không lưu trữ payload trên server mà chỉ phản ánh
            (reflect) payload từ request của người dùng vào response.
          </Paragraph>
        </Card>

        <Card
          className="mb-4"
          title={
            <Search
              placeholder="Nhập nội dung tìm kiếm..."
              onSearch={handleSearch}
              enterButton
              style={{ maxWidth: 500 }}
            />
          }
          extra={
            <>
              <Text>Bảo vệ XSS:</Text>
              <Switch
                checked={isProtected}
                onChange={setIsProtected}
                checkedChildren="Bật"
                unCheckedChildren="Tắt"
              />
            </>
          }
        >
          <div className="mb-4">
            <Paragraph>
              Trang này chứa lỗ hổng Reflected XSS trong việc xử lý query parameter. Khi bạn nhập
              payload XSS vào ô tìm kiếm, nó sẽ được phản ánh trực tiếp vào trang thông qua{' '}
              <Text code>dangerouslySetInnerHTML</Text>.
            </Paragraph>

            <div className="flex items-center gap-2"></div>
            {searchKey && (
              <div>
                <Title level={4}>Kết quả tìm kiếm cho:</Title>
                {isProtected ? (
                  <div>{safeSearchKey}</div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: searchKey }} />
                )}
              </div>
            )}
          </div>
        </Card>

        <Card className="mb-4">
          <Title level={4}>Các payload XSS mẫu :</Title>
          <ul>
            <li>
              <Text code>{'<img src="x" onerror="alert(document.cookie)">'}</Text> - Sử dụng onerror
            </li>
            <li>
              <Text code>{'<svg onload="alert(document.cookie)">'}</Text> - Sử dụng SVG
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
