import { Row, Statistic, Col, Spin, Flex, DatePicker } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
export default ({ isLoading, data }) => {
  const dateFormat = 'YYYY/MM/DD';

  return (
    <PageHeader
      title="Statistics"
      extra={
        <>
          Date ranges:
          <RangePicker defaultValue={[dayjs().subtract(30, 'days'), dayjs()]} format={dateFormat} />
        </>
      }
    >
      {isLoading && (
        <Flex gap="middle" vertical>
          <Spin tip="Loading" />
        </Flex>
      )}
      <Row className="padding-wrap" style={{ paddingBottom: 24 }}>
        <Col flex={1}>
          <Statistic title="Sessions" value={0} valueStyle={{ color: '#0FB45B' }} />
        </Col>
        <Col flex={1}>
          <Statistic title="Activated Users" value={0} valueStyle={{ color: '#3195CE' }} />
        </Col>
        <Col flex={1}>
          <Statistic title="Screen Page Views" value={0} valueStyle={{ color: '#e74c3c' }} />
        </Col>
        <Col flex={1}>
          <Statistic title="New Users" value={0} valueStyle={{ color: '#262626   ' }} />
        </Col>
      </Row>
    </PageHeader>
  );
};
