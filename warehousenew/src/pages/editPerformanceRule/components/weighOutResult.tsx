import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const weighOutResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={8}>
          <Card title="打包包裹数" bordered={false}>
            <Form.Item
              label="起始值"
              name="packingTotalNum[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="packingTotalNum[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="packingTotalNum[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="packingTotalNum[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="packingTotalNum[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="包裹净重" bordered={false}>
            <Form.Item
              label="起始值"
              name="packingNetWeight[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="packingNetWeight[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="packingNetWeight[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="packingNetWeight[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="packingNetWeight[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="包裹毛重" bordered={false}>
            <Form.Item
              label="起始值"
              name="packingRoughWeight[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="packingRoughWeight[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="packingRoughWeight[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="packingRoughWeight[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="packingRoughWeight[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default weighOutResult;
