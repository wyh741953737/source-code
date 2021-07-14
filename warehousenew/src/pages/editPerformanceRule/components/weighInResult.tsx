import React from 'react';
import { Form, Card, Col, Row, InputNumber } from 'antd';

interface Props {
  params: any;
}
/**
 * 分标
 * @param param0
 */
const weighInResult: React.FC<Props> = ({ params }) => {
  return (
    <div className="site-card-wrapper">
      <Row gutter={27}>
        <Col span={3}>
          <Card title="称重批次" bordered={false}>
            <Form.Item label="起始值" name="batchNumber[0]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="结束值" name="batchNumber[1]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="间距值" name="batchNumber[2]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分开始" name="batchNumber[3]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item label="积分间距" name="batchNumber[4]" initialValue={1}>
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="称重次数" bordered={false}>
            <Form.Item
              label="起始值"
              name="weighTotalCount[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="weighTotalCount[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="weighTotalCount[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="weighTotalCount[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="weighTotalCount[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="修改重量次数" bordered={false}>
            <Form.Item
              label="起始值"
              name="modifyWeightCount[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="modifyWeightCount[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="modifyWeightCount[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="modifyWeightCount[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="modifyWeightCount[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="修改体积次数" bordered={false}>
            <Form.Item
              label="起始值"
              name="modifyVolumeCount[0]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="结束值"
              name="modifyVolumeCount[1]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="间距值"
              name="modifyVolumeCount[2]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分开始"
              name="modifyVolumeCount[3]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
            <Form.Item
              label="积分间距"
              name="modifyVolumeCount[4]"
              initialValue={1}
            >
              <InputNumber precision={0} min={0} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={3}>
          <Card title="称重数量" bordered={false}>
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
        {/* <Col span={3}>
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
        </Col> */}
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

export default weighInResult;
