import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const inspectionResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={24}>
        <Col span={3}>
          <Card title="质检批次" bordered={false}>
            <Form.Item
              label="起始值"
              name="collarBatchCount[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="collarBatchCount[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="collarBatchCount[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="collarBatchCount[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="collarBatchCount[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="商品总数" bordered={false}>
            <Form.Item
              label="起始值"
              name="productAllCount[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="productAllCount[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="productAllCount[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="productAllCount[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="productAllCount[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="质检sku数量" bordered={false}>
            <Form.Item label="起始值" name="skuAllCount[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="skuAllCount[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="skuAllCount[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="skuAllCount[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="skuAllCount[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="变体sku数量" bordered={false}>
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

export default inspectionResult;
