import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const shelvesResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={8}>
          <Card title="上架变体数" bordered={false}>
            <Form.Item label="起始值" name="skuStanCount[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="skuStanCount[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="skuStanCount[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="skuStanCount[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="skuStanCount[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
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
        <Col span={8}>
          <Card title="上架重量(g)" bordered={false}>
            <Form.Item label="起始值" name="weighNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="weighNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="weighNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="weighNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="weighNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="上架体积(cm^3)" bordered={false}>
            <Form.Item label="起始值" name="volumeNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="volumeNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="volumeNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="volumeNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="volumeNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default shelvesResult;
