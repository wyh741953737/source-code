import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const distributeResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={3}>
          <Card title="扫描包裹数量" bordered={false}>
            <Form.Item label="起始值" name="packageNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="packageNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="packageNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="packageNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="packageNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="分标sku数量" bordered={false}>
            <Form.Item label="起始值" name="skuNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="skuNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="skuNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="skuNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="skuNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="变体sku数量" bordered={false}>
            <Form.Item label="起始值" name="skuVariantNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="skuVariantNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="skuVariantNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="skuVariantNum[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="skuVariantNum[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="到货数量" bordered={false}>
            <Form.Item
              label="起始值"
              name="arrivalGoodsNum[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="arrivalGoodsNum[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="arrivalGoodsNum[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="arrivalGoodsNum[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="arrivalGoodsNum[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="合格数量" bordered={false}>
            <Form.Item label="起始值" name="qualifiedNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="qualifiedNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="qualifiedNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="qualifiedNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="qualifiedNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="次品数量" bordered={false}>
            <Form.Item
              label="起始值"
              name="ungradedProductsNum[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="ungradedProductsNum[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="ungradedProductsNum[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="ungradedProductsNum[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="ungradedProductsNum[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="少货数量" bordered={false}>
            <Form.Item label="起始值" name="lessGoodsNum[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="lessGoodsNum[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="lessGoodsNum[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="lessGoodsNum[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="lessGoodsNum[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="多货数量" bordered={false}>
            <Form.Item
              label="起始值"
              name="multipleGoodsNum[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="multipleGoodsNum[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="multipleGoodsNum[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="multipleGoodsNum[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="multipleGoodsNum[4]"
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

export default distributeResult;
