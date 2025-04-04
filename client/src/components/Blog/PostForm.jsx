import { Form, Input, Button, message } from 'antd';
import axios from '../../utils/axios';

const PostForm = ({ fetchPosts }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!values.content) {
      return;
    }
    try {
      const response = await axios.post('/posts', values);
      const { success, msg } = response.data;
      console.log('response', response);
      if (success) {
        message.success(msg);
        fetchPosts();
        form.resetFields();
      } else {
        message.error(message);
      }
    } catch (error) {}
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="content">
        <Input.TextArea placeholder="Nhập xì ta tút" style={{ height: '54px', width: '570px' }} />
      </Form.Item>
      <Form.Item style={{ marginRight: '0px' }}>
        <Button type="primary" htmlType="submit" style={{ height: '54px', width: '100%' }}>
          Đăng xì ta tút
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
