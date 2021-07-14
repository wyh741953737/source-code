import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const packageResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={6}>
          <Card title="打包面单数" bordered={false}>
            <Form.Item label="起始值" name="sheetCount[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="sheetCount[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="sheetCount[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="sheetCount[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="sheetCount[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="商品数量" bordered={false}>
            <Form.Item label="起始值" name="productCount[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="productCount[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="productCount[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="productCount[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="productCount[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="体积(cm^3)" bordered={false}>
            <Form.Item label="起始值" name="volumeCount[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="volumeCount[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="volumeCount[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="volumeCount[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="volumeCount[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="重量(g)" bordered={false}>
            <Form.Item label="起始值" name="weightNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="weightNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="weightNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="weightNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="weightNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default packageResult;
